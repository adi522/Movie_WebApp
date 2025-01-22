import React, { useState } from 'react';

function ContactUs() {
    document.title = "Contact Me"
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Form is submitted")
        setName('')
        setEmail('')
        setDescription('')
    }

    return (
        <div className="text-white mx-auto  p-6 md:p-10 space-y-6 overflow-y-auto w-full">
            <h1 className="text-4xl font-bold text-center mb-4">Get in Touch with Me</h1>

            <section className="space-y-4 text-center">
                <p className="text-lg">
                    We'd love to hear from you! Whether you have feedback, questions, or suggestions, feel free to reach out.
                </p>
            </section>

            <h2 className="text-2xl font-semibold flex justify-center items-center mb-3">Contact Details</h2>
            <div className="flex justify-center items-center">
                <ul className="space-y-2">
                    <li>
                        <span className="font-semibold">Email:</span>
                        <a href="mailto:adityanagmal1244@gmail.com" className="text-blue-400 hover:underline"> Mail adityanagmal</a>
                    </li>
                    <li>
                        <span className="font-semibold"> Phone:</span>
                        <a href="tel:+918856881244" className="text-blue-400 hover:underline"> Phone</a>
                    </li>
                    <li>
                        <span className="font-semibold">Follow Me:</span>
                        <div className="space-x-4 mt-2">
                            <a href="https://magical-maamoul-87eeb2.netlify.app/" target='_blank' className="text-blue-400 hover:underline">Portfolio</a>
                            <a href="https://linkedin.com/in/aditya-nagmal" target='_blank' className="text-blue-400 hover:underline">LinkedIn</a>
                            <a href="https://github.com/adi522" target='_blank' className="text-blue-400 hover:underline">Github</a>
                        </div>
                    </li>
                </ul>
            </div>

            <div className=" mt-10">
                <h2 className="text-2xl font-semibold text-center">Send Me a Message</h2>
                <form className="space-y-4 max-w-xl mx-auto" onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium">Name</label>
                        <input
                            type="text"
                            required
                            id="name"
                            className="w-full p-3 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-lg font-medium">Message</label>
                        <textarea
                            id="message"
                            rows="5"
                            className="w-full p-3 rounded-md bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Write your message here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 rounded-md text-lg font-medium text-white hover:bg-blue-600"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            <div className="text-center mt-6">
                <p className="text-lg font-semibold">
                    Your feedback helps us improve and bring you the best experience. Thank you for supporting Movie Explorer!
                </p>
            </div>

        </div>
    );
}

export default ContactUs;
