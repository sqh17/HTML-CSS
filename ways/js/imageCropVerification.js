class ImageCropVerification {
	constructor(options) {
		let {dragDom, checkDom} = options
		this.dragDom = dragDom;
		this.checkDom = checkDom;
	}
	// 成功回调
	success(){
		console.log('通过校验');
	}
	init() {

		// 声明鼠标按下事件
		const dragMouseDown = event => {
			// 添加鼠标移动事件
			document.addEventListener('mousemove', dragMouseMove)
		}
		// 监听鼠标移动事件
		const dragMouseMove = event => {
			// 获取当前 x 轴坐标
			const {
				pageX
			} = event
			if (pageX < 0 || pageX > 350) {
				return
			}
			// 修改可移动盒子的 x 轴坐标
			this.dragDom.style.transform = `translateX(${pageX}px)`

			// 修改被校验区域坐标
			this.checkDom.style.transform = `translateX(${pageX}px)`

			if (pageX >= 278 && pageX <= 285) {
				// 执行回调
				this.success()
			}
		}
		// 结束鼠标监听事件
		const dragMouseUP = event => {
			// 移除鼠标移动事件
			document.removeEventListener('mousemove', dragMouseMove)

			// 获取当前 x 轴坐标
			const {
				pageX
			} = event

			if (pageX < 278 || pageX > 285) {
				// 修改可移动盒子的 x 轴坐标
				this.dragDom.style.animation = 'move 0.5s ease-in-out'
				// 修改被校验区域坐标
				this.checkDom.style.animation = 'move 0.5s ease-in-out'

				// 动画结束监听回调
				const animationEnd = () => {
					// 修改可移动盒子的 x 轴坐标
					this.dragDom.style.transform = `translateX(${0}px)`
					// 修改被校验区域坐标
					this.checkDom.style.transform = `translateX(${0}px)`

					// 清除动画属性
					this.dragDom.style.animation = ''
					this.checkDom.style.animation = ''
					// 移出动画结束监听
					document.removeEventListener("animationend", animationEnd)
				}
				// 添加动画结束监听
				document.addEventListener("animationend", animationEnd)
			}
		}

		// 添加鼠标按下事件
		document.addEventListener('mousedown', dragMouseDown)
		// 添加鼠标弹起事件
		document.addEventListener('mouseup', dragMouseUP)

	}
}

export default ImageCropVerification