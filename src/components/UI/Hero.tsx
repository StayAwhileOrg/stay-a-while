import heroImg from "../../assets/hero.png";

export function Hero() {
    return (
        <div>
            <div className="relative w-full">
                <img src={heroImg} alt="hero" className="w-full h-[600px] object-cover" />
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-hero m-6">
                    <p className="text-5xl font-medium text-black">
                        Welcome to <span className="italic">stayAwhile</span>
                    </p>
                    <p className="text-xl text-black pt-6">
                        Embrace the Serenity of Nature –
                        <br className="block sm:hidden" /> Book Your Cabin Getaway
                    </p>
                </div>
            </div>
            <h2 className="text-2xl flex justify-center pt-4">Browse our listings</h2>
        </div>

    )
}