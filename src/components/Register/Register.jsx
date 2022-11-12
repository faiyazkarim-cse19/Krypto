import React, { useState } from "react";
import "./Register.css";
import Helmet from 'react-helmet';
import cryptocurrency from '../../images/cryptocurrency.png';
import 'tachyons';
import Tilt from 'react-parallax-tilt';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const particleOptions = {
    background: {
        color: {
            value: "",
        },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            directions: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 6,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "square",
        },
        size: {
            value: { min: 5, max: 10 },
        },
    },
    detectRetina: true,
}

export const Register = (props) => {

    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);
    
    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        props.onRouteChange('yes');
    }

    return (
        <div >
        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
      />
        <Helmet bodyAttributes={{style: 'background-color : #001529'}} />
        <Tilt tiltMaxAngleY={2} tiltMaxAngleX={5}>
                <div className='Tilt left br2 shadow-2 pa3 ma4 mt3' style={{ height: '8em', width: '8em'}}>
                    <img alt='logo' src={cryptocurrency}/>
                </div>
        </Tilt>
        <div className="regbackground">
        <div className="regshape"></div>
        <div className="regshape"></div>
        </div>
        <div className="regauth-form-container">
            <h2>Registration</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label className="reglabel" htmlFor="name">Full Name</label>
            <input className="reginput" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="Full Name" />
            <label className="reglabel" htmlFor="email">Email</label>
            <input className="reginput" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label className="reglabel" htmlFor="password">Password</label>
            <input className="reginput" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button className="regbtn1" type="submit">Register</button>
            <button className="reglink-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </form>
        
    </div>
    </div>
    )
}

export default Register;