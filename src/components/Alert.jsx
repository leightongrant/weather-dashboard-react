const Alert = ({ alertMessage, setMessage }) => {
	return (
		<div className='flex justify-center mx-auto my-3 w-fit'>
			<div
				role='alert'
				className='flex justify-between alert alert-warning'
			>
				<p className='text-lg text-black'>{alertMessage}</p>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='w-6 h-6 stroke-current shrink-0 hover:cursor-pointer'
					fill='none'
					viewBox='0 0 24 24'
					onClick={() => setMessage('')}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			</div>
		</div>
	)
}

export default Alert
