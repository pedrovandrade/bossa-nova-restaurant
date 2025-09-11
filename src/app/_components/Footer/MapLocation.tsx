interface MapLocationProps {
  query: string;
}

const MapLocation = ({ query }: MapLocationProps) => {
  return (
    <iframe
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`}
      width='600'
      height='400'
      style={{ border: 0 }}
      allowFullScreen={false}
      loading='lazy'
      className='rounded-md w-full h-64 md:h-80 lg:h-96'
    ></iframe>
  );
};

export default MapLocation;