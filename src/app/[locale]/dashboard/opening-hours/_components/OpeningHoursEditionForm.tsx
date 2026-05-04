'use client';

import { Cross } from '@/components/_icons';
import { OpeningHoursData } from '@/types/OpeningHoursData';
import DashboardForm from '@/components/DashboardForm';
import { Switch } from '@ark-ui/react';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import { FC, useState } from 'react';

type OpeningHoursEditionFormProps = {
  openingHoursData: OpeningHoursData;
};

type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

const WEEKDAYS: Weekday[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

/**
 * Convert 'HH:MM' to minutes since midnight.
 * @returns Number of minutes since midnight, capped between 0 and 1439 (23:59).
 */
function timeToMinutes(t: string) {
  const [h = '0', m = '0'] = t.split(':');
  return Math.max(0, Math.min(23, Number(h))) * 60 + Math.max(0, Math.min(59, Number(m)));
}

/**
 * Convert minutes since midnight to 'HH:MM'.
 * @returns A string in 'HH:MM' format, capped between '00:00' and '23:59'.
 */
function minutesToTime(mins: number) {
  const m = Math.max(0, Math.min(23 * 60 + 59, Math.round(mins)));
  const hh = Math.floor(m / 60)
    .toString()
    .padStart(2, '0');
  const mm = (m % 60).toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

/**
 * Add hours (floating) to a 'HH:MM' string and cap at 23:59.
 * @returns A new 'HH:MM' string with the hours added, capped at '23:59'.
 */
function addHoursToTime(time: string, hours: number) {
  return minutesToTime(timeToMinutes(time) + Math.round(hours * 60));
}

/**
 * Validate opening hours for all weekdays through the following rules:
 * - If a day is open, all timespans must have both begin and end hours.
 * - Begin hour must be earlier than end hour for each timespan.
 * - Timespans for a day must not overlap (begin hour must be later than previous end hour).
 * @param openingHours The opening hours info for all weekdays to validate.
 * @returns The errors data object keyed by weekday -> index -> message.
 */
function validateOpeningHours(openingHours: OpeningHoursData) {
  const errors: Partial<Record<Weekday, string[]>> = {};
  for (const weekday of WEEKDAYS) {
    const day = openingHours[weekday];
    if (!day) continue;
    const dayErrors: string[] = [];
    // if closed, nothing to validate
    if (!day.isOpen) {
      errors[weekday] = dayErrors;
      continue;
    }
    const spans = day.timespans || [];
    for (let i = 0; i < spans.length; i++) {
      const cur = spans[i];
      const prev = spans[i - 1];
      if (!cur.begin || !cur.end) {
        dayErrors[i] = 'hourMissed';
        continue;
      }
      const begin = timeToMinutes(cur.begin);
      const end = timeToMinutes(cur.end);
      if (begin >= end) {
        dayErrors[i] = 'startAfterEnd';
        continue;
      }
      if (prev) {
        const prevEnd = timeToMinutes(prev.end);
        if (begin <= prevEnd) {
          dayErrors[i] = 'hoursOverlap';
          continue;
        }
      }
      dayErrors[i] = '';
    }
    errors[weekday] = dayErrors;
  }
  const hasError = Object.values(errors).some((arr) => arr.some((s) => s && s.length > 0));
  return { errors, hasError };
}

const OpeningHoursEditionForm: FC<OpeningHoursEditionFormProps> = ({ openingHoursData }) => {
  const [openingHours, setOpeningHours] = useState<OpeningHoursData | null>(openingHoursData);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const t = useTranslations('pages.dashboard.pages.openingHours');

  const validation = useMemo(() => (openingHours ? validateOpeningHours(openingHours) : { errors: {}, hasError: false }), [openingHours]);
  
  /**
   * Toggle open/closed for a weekday.
   * When closing, inputs are disabled; when opening, if no spans present one default span is inserted.
   */
  function toggleOpen(weekday: Weekday) {
    if (!openingHours) return;
    setTouched(true);
    setOpeningHours((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      const day = { ...copy[weekday] };
      day.isOpen = !day.isOpen;
      if (day.isOpen && (!day.timespans || day.timespans.length === 0)) {
        day.timespans = [{ begin: '10:00', end: '12:00' }];
      }
      copy[weekday] = day;
      return copy;
    });
  }

  /**
   * Update a timespan value for a given weekday/index.
   */
  function updateTimespan(weekday: Weekday, idx: number, which: 'begin' | 'end', value: string) {
    setTouched(true);
    setOpeningHours((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      const day = { ...copy[weekday], timespans: [...(copy[weekday].timespans || [])] };
      const span = { ...(day.timespans[idx] || { begin: '00:00', end: '00:00' }) };
      span[which] = value;
      day.timespans[idx] = span;
      copy[weekday] = day;
      return copy;
    });
  }

  /**
   * Add a timespan row for a weekday.
   * Pre-fills new begin = prev.end + 2h (capped at 23:59), new end = new begin + 2h (capped).
   * @param weekday The weekday key.
   * @returns A new timespan prefilled with a 2 hours advance from the previous one.
   */
  function addTimespan(weekday: Weekday) {
    if (!openingHours) return;
    setTouched(true);
    setOpeningHours((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      const day = { ...copy[weekday], timespans: [...(copy[weekday].timespans || [])] };
      const last = day.timespans[day.timespans.length - 1];
      const prevEnd = last ? last.end : '12:00';
      const newBegin = addHoursToTime(prevEnd, 2);
      const newEnd = addHoursToTime(newBegin, 2);
      day.timespans.push({ begin: newBegin, end: newEnd });
      copy[weekday] = day;
      return copy;
    });
  }

  /**
   * Delete a timespan row for a weekday.
   */
  function deleteTimespan(weekday: Weekday, index: number) {
    if (!openingHours) return;
    setTouched(true);
    setOpeningHours((prev) => {
      if (!prev) return prev;
      const copy = { ...prev };
      const day = { ...copy[weekday], timespans: [...(copy[weekday].timespans || [])] };
      day.timespans.splice(index, 1);
      copy[weekday] = day;
      return copy;
    });
  }

  /**
   * Save the opening hours changes on the database through the API's
   * `"api/openingHours"` PUT endpoint. If successful, redirects the
   * user to the dashboard page.
   * @return void
   */
  async function saveChanges() {
    if (!openingHours) return;

    const response = await fetch('/api/openingHours', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(openingHours),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      setSubmitError(errorMessage || 'Save failed');
      throw new Error(errorMessage || 'Save failed');
    }
  }

  return (
    <DashboardForm
        onSubmit={saveChanges}
        hasErrors={touched && validation.hasError}
      >
        <div className='px-4 py-8 md:px-12'>
          <table className='border-collapse w-full' aria-describedby='opening-hours-desc'>
            <caption id='opening-hours-desc' className='sr-only'>
              {t('caption')}
            </caption>
            <thead>
              <tr>
                <th className='text-left border-b p-3'>{t('tableHeaders.weekday')}</th>
                <th className='text-left border-b p-3'>{t('tableHeaders.openingHours')}</th>
                <th className='text-left border-b p-3'>{t('tableHeaders.status')}</th>
              </tr>
            </thead>
            <tbody>
              {openingHours &&
                WEEKDAYS.map((weekday) => {
                  const day = openingHours[weekday];
                  const timespans = !day?.timespans?.length ? [{ begin: '', end: '' }] : day.timespans;
                  return (
                    <React.Fragment key={weekday}>
                      {timespans.map((timespan, index) => (
                        <tr key={`${weekday}-${index}`}>
                          {index === 0 && (
                            <td rowSpan={timespans.length + 1} className='align-top p-3'>
                              {t(`weekdays.${weekday}`)}
                            </td>
                          )}

                          <td className='p-3'>
                            <div className='flex flex-col md:flex-row items-start md:items-center gap-3'>
                              <div className='flex flex-col w-full md:w-auto'>
                                <label className='text-sm'>{t('from')}</label>
                                <input
                                  type='time'
                                  aria-label={`${t(`weekdays.${weekday}`)} begin time ${index + 1}`}
                                  min='00:00'
                                  max='23:59'
                                  value={timespan.begin}
                                  disabled={!day.isOpen}
                                  onChange={(event) => updateTimespan(weekday, index, 'begin', event.target.value)}
                                  className={[
                                    'border',
                                    'px-2',
                                    'py-1',
                                    'rounded',
                                    'disabled:text-slate-400',
                                    'hover:cursor-pointer',
                                    'max-w-40 md:max-w-auto',
                                    'disabled:hover:cursor-not-allowed',
                                  ].join(' ')}
                                />
                              </div>
                              <div className='flex flex-col w-full md:w-auto'>
                                <label className='text-sm'>{t('to')}</label>
                                <input
                                  type='time'
                                  aria-label={`${t(`weekdays.${weekday}`)} end time ${index + 1}`}
                                  min='00:00'
                                  max='23:59'
                                  value={timespan.end}
                                  disabled={!day.isOpen}
                                  onChange={(event) => updateTimespan(weekday, index, 'end', event.target.value)}
                                  className={[
                                    'border',
                                    'px-2',
                                    'py-1',
                                    'rounded',
                                    'disabled:text-slate-400',
                                    'hover:cursor-pointer',
                                    'max-w-40 md:max-w-auto',
                                    'disabled:hover:cursor-not-allowed',
                                  ].join(' ')}
                                />
                              </div>

                              <div className='flex items-center gap-2 ml-3'>
                                <button
                                  onClick={() => deleteTimespan(weekday, index)}
                                  type='button'
                                  className={[
                                    'w-6',
                                    'h-6',
                                    'border',
                                    'rounded-full',
                                    'bg-bossanova-red',
                                    'text-white',
                                    'hover:cursor-pointer',
                                    'disabled:hidden',
                                  ].join(' ')}
                                  aria-label={`Delete timespan ${index + 1} for ${t(`weekdays.${weekday}`)}`}
                                  disabled={!day.isOpen}
                                >
                                  <Cross />
                                </button>
                              </div>
                            </div>

                            {/* per-row validation message */}
                            <div role='alert' aria-live='polite' className='text-sm text-red-600 mt-1'>
                              {validation?.errors?.[weekday]?.[index] ? t(`errors.${validation?.errors?.[weekday]?.[index]}`) : ''}
                            </div>
                          </td>

                          {index === 0 && (
                            <td rowSpan={timespans.length + 1} className='p-3 align-top'>
                              <div className='flex items-center'>
                                <Switch.Root
                                  checked={day.isOpen}
                                  onCheckedChange={() => toggleOpen(weekday)}
                                  aria-label={`${t(`weekdays.${weekday}`)} ${t('open')}`}
                                  className={[
                                    'h-6',
                                    'w-11',
                                    'rounded-full',
                                    'transition-colors',
                                    'focus:outline-none',
                                    day.isOpen ? 'bg-bossanova-green' : 'bg-slate-300'
                                  ].join(' ')}
                                >
                                  <Switch.Control className='hover:cursor-pointer'>
                                    <Switch.Thumb className={[
                                      'block',
                                      'block',
                                      'h-4',
                                      'w-4',
                                      'bg-white',
                                      'rounded-full',
                                      'transform',
                                      'transition-transform',
                                      'mt-1',
                                      day.isOpen ? 'translate-x-6' : 'translate-x-1'
                                    ].join(' ')} />
                                  </Switch.Control>
                                  <Switch.Label>{day.isOpen ? t('open') : t('closed')}</Switch.Label>
                                  <Switch.HiddenInput />
                                </Switch.Root>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))
                      }
                      <tr className='border-b border-b-slate-300'>
                        <td className='px-3 pt-3 pb-8'>
                          <button
                            type='button'
                            onClick={() => addTimespan(weekday)}
                            className={[
                              'bg-bossanova-green',
                              'text-white',
                              'font-bold',
                              'text-base',
                              'w-full',
                              'px-6',
                              'py-2',
                              'rounded-md',
                              'hover:cursor-pointer',
                              'disabled:hover:cursor-not-allowed',
                              'focus:ring-2',
                              'focus:ring-bossanova-cyan',
                              'focus:ring-opacity-50',
                              'disabled:bg-bossanova-green/50'
                            ].join(' ')}
                            aria-label={`Add timespan for ${t(`weekdays.${weekday}`)}`}
                            disabled={!day.isOpen}
                          >
                            {t('add')}
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
            </tbody>
          </table>

          {/* ** global error message ** */}
          {touched && validation.hasError && (
            <div className='mt-4 text-red-600' role='alert'>
              {t('errors.globalMessage')}
            </div>
          )}
          {submitError && (
            <div className='mt-4 text-red-600' role='alert'>
              {submitError}
            </div>
          )}
        </div>
      </DashboardForm>
  );
};

export default OpeningHoursEditionForm;