import { Helmet } from "react-helmet-async";
import Breadcrumb from '../components/Breadcrumb';
import { Link as ExternalLink } from "react-router-dom";
//import { HashLink as Link } from 'react-router-hash-link';

const Cookies = () => {
    return (
        <>
            <Helmet>
                <title>Cookie Policy</title>
            </Helmet>
            <Breadcrumb pageName="Cookie Policy" />

            <div className="grid grid-cols-1 gap-9 grid-flow-dense">
                <div className="flex flex-col gap-9">
                    <div className="flex gap-9">
                        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5 flex flex-wrap items-start flex-col md:flex-row">
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">What Are Cookies</h2>
                                <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how I use it and why I sometimes need to store these cookies. I will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">How I Use Cookies</h2>
                                <p>I use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">Disabling Cookies</h2>
                                <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">The Cookies I Set</h2>
                                <ul>
                                    <li>
                                        <p><strong>Site preferences cookies</strong></p>
                                        <p>In order to provide you with a great experience on this site I provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences I need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
                                    </li>
                                    <li>
                                        <p><strong>Third Party Cookies</strong></p>
                                        <p>In some special cases I also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
                                        <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that I can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so I can continue to produce engaging content.</p>
                                        <p>For more information on Google Analytics cookies, see the official <ExternalLink to="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink> and <ExternalLink to="https://policies.google.com/technologies/cookies">Google Cookie Policy</ExternalLink>.</p>
                                        {/* <p>This site uses Hotjar see visitor interactions on the website which I can use to improve your experence. It places cookies for identify unique visitors, and stores all interactions in an anonymous manner.</p> */}
                                        {/* <p>For more information on Hotjar cookies, see the official <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="nofollow noreferrer external">Hotjar Privacy Policy</a>.</p> */}
                                    </li>
                                    <li>
                                        <p>From time to time I test new features and make subtle changes to the way that the site is delivered. When I'm still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring I understand which optimisations our users appreciate the most.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">More Information</h2>
                                <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cookies;
