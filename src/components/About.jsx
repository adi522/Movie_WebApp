import React from 'react';

function About() {
    document.title = "About";
    return (
        <div className="text-white p-6 md:p-10 space-y-6">
            <h1 className="text-4xl font-bold text-center mb-4">Discover the World of Movies with Movie Explorer</h1>

            <section className="space-y-4">
                <p className="text-lg">
                    Welcome to <span className="font-semibold">Movie Explorer</span>! This website was built using the <span className="font-semibold">TMDB API</span>, a comprehensive and reliable source of movie and TV show data. Our goal is to provide you with a seamless and enjoyable way to explore the fascinating world of cinema.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Our Mission</h2>
                <p className="text-lg">
                    Our mission is to make discovering movies and TV shows fun, accessible, and personalized. Whether you're a casual viewer or a passionate film enthusiast, <span className="font-semibold">Movie Explorer</span> is here to enhance your cinematic journey.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Why TMDB API?</h2>
                <p className="text-lg">
                    The <span className="font-semibold">TMDB API</span> was the perfect choice for building this platform. It offers an extensive collection of movie and TV data, including trending titles, detailed information, and updates from a passionate global community. This ensures that you always have access to the latest and most accurate information.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">What You Can Expect</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><span className="font-semibold">Extensive Database:</span> Explore a vast library of movies and TV shows with rich details.</li>
                    <li><span className="font-semibold">Real-Time Updates:</span> Stay informed about the latest releases and trending titles.</li>
                    <li><span className="font-semibold">User-Friendly Interface:</span> Navigate effortlessly to find your favorite movies and shows.</li>
                    <li><span className="font-semibold">Personalized Recommendations:</span> Get content suggestions tailored to your tastes.</li>
                </ul>
            </section>

            <footer className="text-center mt-6">
                <p className="text-lg font-semibold">
                    Thank you for visiting <span className="font-semibold">Movie Explorer</span>. Let's embark on this cinematic journey together!
                </p>
            </footer>
        </div>
    );
}

export default About;
