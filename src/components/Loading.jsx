import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
	return (
		<div
			style={{ backgroundColor: 'transparent', height: '90vh' }}
			className='flex items-center justify-center'
		>
			<RotatingLines
				visible={true}
				height='96'
				width='96'
				color='orange'
				strokeWidth='5'
				animationDuration='0.75'
				ariaLabel='rotating-lines-loading'
				wrapperStyle={{}}
				wrapperClass=''
				
			/>
		</div>
	)
}

export default Loading
