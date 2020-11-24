import React from 'react'
import { Button } from 'react-bootstrap'

export default function Finish() {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column'
			}}
		>
			<h1>Obrigado pela pesquisa</h1>
			<Button>
				Início
			</Button>
		</div>
	)
}
