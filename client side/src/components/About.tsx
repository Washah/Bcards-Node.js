import { FunctionComponent } from "react";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (<>
        <div className="about-class">
            <h1 className="about-title">ABOUT</h1>
            <p>Digital business cards are the modern way to share contact information. Also known as virtual and electronic business cards, digital business cards are more interactive, cost-effective, and sustainable than their physical counterparts. One significant benefit of digital business cards is that they can be shared with anyone, anywhere.  digital business cards can be created on iOS, Android, or computer and can be completely customized to fit your style.
                Customize your card to match your brand.
                <br />
                <br />
                Business cards should include more than basic contact information.  , you can have your preferred name, pronouns, and any accreditations on your digital business card. Add a picture of yourself, so people remember who you are, or add a live photo or video to bring your card to life. Include your social media accounts, a company logo,  page,is truly the most customizable business card app .
                <br />
                Business cards should include more than basic contact information.  , you can have your preferred name, pronouns, and any accreditations on your digital business card.
            </p>
        </div>
    </>);
}

export default About;