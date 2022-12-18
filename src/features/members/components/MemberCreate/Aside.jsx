export const Aside = () => {
  return (
    <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
      <div className='stepper-nav ps-lg-10'>
        <div className='stepper-item current'>
          <div className='stepper-wrapper'>
            <div className='stepper-icon w-40px h-40px'>
              <i className='stepper-check fas fa-check'></i>
              <span className='stepper-number'>1</span>
            </div>
            <div className='stepper-label'>
              <h3 className='stepper-title'>Activation Code</h3>
              <div className='stepper-desc'>Verify your Code Package</div>
            </div>
          </div>
          <div className='stepper-line h-40px' />
        </div>
        <div className='stepper-item'>
          <div className='stepper-wrapper'>
            <div className='stepper-icon w-40px h-40px'>
              <i className='stepper-check fas fa-check'></i>
              <span className='stepper-number'>2</span>
            </div>
            <div className='stepper-label'>
              <h3 className='stepper-title'>Genealogy</h3>
              <div className='stepper-desc'>Enter your Parent and Sponsor</div>
            </div>
          </div>
          <div className='stepper-line h-40px' />
        </div>
        <div className='stepper-item'>
          <div className='stepper-wrapper'>
            <div className='stepper-icon w-40px h-40px'>
              <i className='stepper-check fas fa-check'></i>
              <span className='stepper-number'>3</span>
            </div>
            <div className='stepper-label'>
              <h3 className='stepper-title'>Personal Info</h3>
              <div className='stepper-desc'>Get your Code Package</div>
            </div>
          </div>
          <div className='stepper-line h-40px' />
        </div>
        <div className='stepper-item'>
          <div className='stepper-wrapper'>
            <div className='stepper-icon w-40px h-40px'>
              <i className='stepper-check fas fa-check'></i>
              <span className='stepper-number'>4</span>
            </div>
            <div className='stepper-label'>
              <h3 className='stepper-title'>Completed</h3>
              <div className='stepper-desc'>Member Account created!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
