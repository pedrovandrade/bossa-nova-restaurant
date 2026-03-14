import { OpeningHoursData } from "@/types/OpeningHoursData";

const openingHours: OpeningHoursData = {
  monday: {
    isOpen: false,
    timespans: [],
  },
  tuesday: {
    isOpen: false,
    timespans: [],
  },
  wednesday: {
    isOpen: true,
    timespans: [
      { begin: '19:00', end: '21:30' },
    ],
  },
  thursday: {
    isOpen: true,
    timespans: [
      { begin: '19:00', end: '21:30' },
    ],
  },
  friday: {
    isOpen: true,
    timespans: [
      { begin: '12:00', end: '13:30' },
      { begin: '19:00', end: '21:30' },
    ],
  },
  saturday: {
    isOpen: true,
    timespans: [
      { begin: '12:00', end: '13:30' },
      { begin: '19:00', end: '21:45' },
    ],
  },
  sunday: {
    isOpen: false,
    timespans: [],
  },
};

export { openingHours };