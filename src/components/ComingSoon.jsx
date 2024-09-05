export function ComingSoon() {
//   const { days, hours, minutes, seconds } = useCountdown('2024-11-28T00:00:00');

  return (
    <div dir='ltr' className='min-h-dvh bg-black flex flex-col items-center justify-between p-8 pt-16 lg:pt-10'>
      {/* <Image
        src='/img/coming-soon.png'
        alt='coming-soon'
        width={2000}
        height={1000}
        priority
        className='fixed inset-0 -z-10 full-size object-cover object-right-top'
      /> */}

      <div className='flex-center gap-3 pr-4 lg:flex-col'>
        {/* <SvgLogoTransparent className='w-11 h-11 lg:w-14 lg:h-14' /> */}
        <div className='w-0.5 h-6 bg-[#FE8A4E] rounded-md lg:hidden' />

        <h1 className='relative text-white text-[22px] font-bold uppercase tracking-[4px] mt-0.5'>
          zarvantrip
          <span className='absolute -top-2 -right-[29px] text-[#FE8A4E] text-cs85 font-bold'>V2</span>
        </h1>
      </div>

      <div className='flex flex-col items-center text-white font-medium'>
        <span className='text-xl font-bold uppercase tracking-wider lg:text-4xl'>Coming Soon ...</span>

        <div className='flex-center gap-x-3 mt-6 lg:gap-x-6'>
          {/* <TimerItem value={days} title='Days' />
          <TimerItem value={hours} title='Hrs' />
          <TimerItem value={minutes} title='Mins' />
          <TimerItem value={seconds} title='Sec' /> */}
        </div>
      </div>

      <div className='text-white text-cs85'>© Copyrights Zarvantrip | All Rights Reserved</div>
    </div>
  );
}
