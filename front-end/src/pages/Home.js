import React from 'react';
import { NavLink } from 'react-router-dom'
import workoutImg from '../images/gym-workout-plan-for-gaining-muscle_header.jpg'
import Footer from '../components/Footer';
import HomeForm from '../components/HomeForm';



const Home = () => {
    return (
        <>
            <div className="hero-section row align-items-center mt-5">
                <div className="col-md-6">
                    <div className="hero-image">
                        <img src={workoutImg} alt="Workout" className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="hero-content">
                        <h1>Welcome to Workout buddy</h1>
                        <h2>Your Ultimate Workout Companion</h2>
                        <p>Transform your fitness journey with personalized plans, progress tracking, and community support.</p>
                        <NavLink to={'/dashboard'} className="btn btn-primary">Get Started</NavLink>
                    </div>
                </div>
            </div>
            <div className="contact_section layout_padding mt-5 mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="contact_taital">Contact Us</h1>
                            <p className="contact_text">Thank you for reaching out to us! We value your feedback and inquiries. Our team is dedicated to providing you with exceptional service and assistance. Please feel free to contact us with any questions, concerns, or suggestions you may have. We look forward to hearing from you and will respond promptly to your message. Your satisfaction is our priority.</p>
                        </div>
                    </div>
                    <div className="contact_section_2">
                        <div className="row">
                            <div className="col-md-6 padding15">
                                <HomeForm />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
