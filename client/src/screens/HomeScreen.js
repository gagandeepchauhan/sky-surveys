import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

import {useLogin} from '../contexts/LoginContext'


import LapImg from '../images/surveyhomeimg.jpg'
// company logos
import a_img from '../images/comp-logos/a.png'
import b_img from '../images/comp-logos/b.png'
import c_img from '../images/comp-logos/c.jpg'
import d_img from '../images/comp-logos/d.jpg'
import e_img from '../images/comp-logos/e.jpg'
import f_img from '../images/comp-logos/f.jpg'
import g_img from '../images/comp-logos/g.jpg'
import h_img from '../images/comp-logos/h.png'
import i_img from '../images/comp-logos/i.png'
import j_img from '../images/comp-logos/j.jpg'

const COMP_LOGOS = [a_img,b_img,c_img,d_img,e_img,f_img,g_img,h_img,i_img,j_img]

export default function HomeScreen() {
	const {isLoggedIn} = useLogin()
	return (
		<>
		<div className="head head-home"></div>
		<div className="home">
			<Navbar />
			<div className="head-content">
				<div className="head-left">
					<div className="head-heading">
						Welcome to <br/><strong>Sky<span className="prime-color-text">Surveys</span></strong>
					</div>
					{!isLoggedIn() &&
						<Link to="/auth/login" className="head-btn">
							Get Started
						</Link>
					}
				</div>
				<div className="head-right">
					<img className="head-img" src={LapImg} alt="home header snap"  />
				</div>
			</div>
			<div className="mt-4 container p-5">
				<div className="info">
					<h5>Why us</h5>
					<div className="row mt-4 p-2">
						<div className="col col-12 col-sm-6 col-md-4 info-card">
							<div className="prime-color-text">
								Get more <br/>visibility
							</div>
							<div className="info-content">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
							</div>
						</div>
						<div className="col col-12 col-sm-6 col-md-4 info-card">
							<div className="prime-color-text">
								Organize your <br/>surveys
							</div>
							<div className="info-content">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</div>
						</div>
						<div className="col col-12 col-sm-6 col-md-4 info-card">
							<div className="prime-color-text">
								Analyze survey <br/>data
							</div>
							<div className="info-content">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
							</div>
						</div>
					</div>
				</div>
				<div className="companies">
					<h5>companies who trust us</h5>
					<div className="comp-flex mt-4 p-2">
						{COMP_LOGOS.map((sr,idx)=>(
							<div key={idx} className="comp-logo">
								<img src={sr} alt="comp logo" />
							</div>	
						))}
					</div>
				</div>
			</div>
		</div>
		</>
	)
}