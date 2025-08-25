const MapLocation = () => {
  return (
    <iframe
      src='https://www.google.com/maps?q=43.6021204,1.4425372&z=17&output=embed'
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