type OpeningHoursDay = {
  isOpen: boolean,
  timespans: {
    begin: string,
    end: string,
  }[],
};

type OpeningHoursData = {
  monday: OpeningHoursDay,
  tuesday: OpeningHoursDay,
  wednesday: OpeningHoursDay,
  thursday: OpeningHoursDay,
  friday: OpeningHoursDay,
  saturday: OpeningHoursDay,
  sunday: OpeningHoursDay,
};

export { OpeningHoursData };