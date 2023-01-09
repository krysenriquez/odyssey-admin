import clsx from 'clsx'

const CustomCardOverlay = (props) => {
  const {
    className,
    shadow,
    flush,
    resetSidePaddings,
    border,
    dashed,
    stretch,
    rounded,
    utilityP,
    utilityPY,
    utilityPX,
    children,
    scroll,
    height,
    isLoading,
  } = props
  return (
    <div
      className={clsx(
        'card ',
        className && className,
        {
          'overlay overlay-block': isLoading,
          'shadow-sm': shadow,
          'card-flush': flush,
          'card-px-0': resetSidePaddings,
          'card-bordered': border,
          'card-dashed': dashed,
        },
        stretch && `card-${stretch}`,
        utilityP && `p-${utilityP}`,
        utilityPX && `px-${utilityPX}`,
        utilityPY && `py-${utilityPY}`,
        rounded && `card-${rounded}`
      )}
    >
      <div
        className={clsx(
          'card-body',
          {
            'card-scroll': scroll,
          },
          height && `h-${height}px`
        )}
      >
        <div className='overlay-wrapper p-5'>{children}</div>
        {isLoading ? (
          <div className='overlay-layer rounded bg-dark bg-opacity-5'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export {CustomCardOverlay}
