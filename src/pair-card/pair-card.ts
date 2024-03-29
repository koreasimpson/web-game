;(function(): void {
	const pair: { horizontal: number; vertical: number; colors: string[] } = {
		horizontal: 4,
		vertical: 3,
		colors: [
			'red',
			'red',
			'orange',
			'orange',
			'green',
			'green',
			'yellow',
			'yellow',
			'white',
			'white',
			'black',
			'black'
		]
	}

	let colorCandidate = pair.colors.slice()
	let color: string[] = []
	let clickFlag: boolean = true
	let clickCard: HTMLDivElement[] = []
	let completeCard: HTMLDivElement[] = []
	let startTime: number | null = new Date().getTime()

	function shuffle(): void {
		for (let i: number = 0; colorCandidate.length > 0; ++i) {
			color = color.concat(
				colorCandidate.splice(
					Math.floor(Math.random() * colorCandidate.length),
					1
				)
			)
		}
	}

	function setCard(horizontal: number, vertical: number): void {
		clickFlag = false
		for (let i: number = 0; i < horizontal * vertical; ++i) {
			const card = document.createElement('div')
			card.className = 'card'
			const cardInner = document.createElement('div')
			cardInner.className = 'card-inner'
			const cardFront = document.createElement('div')
			cardFront.className = 'card-front'
			const cardBack = document.createElement('div')
			cardBack.className = 'card-back'
			cardBack.style.backgroundColor = color[i]
			cardInner.appendChild(cardFront)
			cardInner.appendChild(cardBack)
			card.appendChild(cardInner)

			card.addEventListener('click', function() {
				console.log(this)
				if (clickFlag && !completeCard.includes(this)) {
					console.log('what')
					this.classList.toggle('flipped')
					clickCard.push(this)
					if (clickCard.length === 2) {
						const firstBackground = (clickCard[0].querySelector(
							'.card-back'
						) as HTMLDivElement).style.backgroundColor
						const secondBackground = (clickCard[1].querySelector(
							'.card-back'
						) as HTMLDivElement).style.backgroundColor
						if (firstBackground === secondBackground) {
							completeCard.push(clickCard[0])
							completeCard.push(clickCard[1])
							clickCard = []

							if (completeCard.length === horizontal * vertical) {
								const endTime: number = new Date().getTime()
								alert(
									`축하합니다 ${(endTime - startTime!) / 1000}초 걸렸습니다`
								)
								document.querySelector('.card--wrap')!.innerHTML = ''
								colorCandidate = color.slice()
								color = []
								completeCard = []
								startTime = null
								shuffle()
								setCard(horizontal, vertical)
							}
						} else {
							clickFlag = false
							setTimeout(() => {
								clickCard[0].classList.remove('flipped')
								clickCard[1].classList.remove('flipped')
								clickFlag = true
								clickCard = []
							}, 1000)
						}
					}
				}
			})

			document.querySelector('.content.pair .card--wrap')!.appendChild(card)
		}

		document.querySelectorAll('.pair .card').forEach(function(item, index) {
			setTimeout(() => {
				item.classList.add('flipped')
			}, 1000 + 100 * index)
		})

		setTimeout(() => {
			document.querySelectorAll('.pair .card').forEach(function(item, index) {
				item.classList.remove('flipped')
			})
		}, 5000)

		clickFlag = true
	}

	let reGameButton = document.querySelector(
		'.content.pair button'
	) as HTMLButtonElement
	reGameButton.addEventListener('click', function() {
		setCard(pair.horizontal, pair.vertical)
	})

	shuffle()
	setCard(pair.horizontal, pair.vertical)
})()
