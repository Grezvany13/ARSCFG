import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import { /*Link as ExternalLink,*/ NavLink } from "react-router-dom";
//import { HashLink as Link } from 'react-router-hash-link';

const Privacy = () => {
    const url = 'arscfg.johandejong.dev';

    return (
        <>
            <Helmet>
                <title>Privacy Policy</title>
            </Helmet>
            <Breadcrumb pageName="Privacy Policy" />

            <div className="grid grid-cols-1 gap-9 grid-flow-dense">
                <div className="flex flex-col gap-9">
                    <div className="flex gap-9">
                        <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5 flex flex-wrap items-start flex-col md:flex-row">
                        <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <p>At <strong>{url}</strong>, one of my main priorities is the privacy of my visitors. This Privacy Policy document contains types of information that is collected and recorded by <strong>{url}</strong> and how I use it.</p>
                                <p>If you have additional questions or require more information about this Privacy Policy, do not hesitate to contact me.</p>
                                <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in <strong>{url}</strong>. This policy is not applicable to any information collected offline or via channels other than this website.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">Consent</h2>
                                <p>By using my website, you hereby consent to our Privacy Policy and agree to its terms.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">Information we collect</h2>
                                <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point I ask you to provide your personal information.</p>
                                <p>If you contact me directly, I may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send me, and any other information you may choose to provide.</p>
                                {/*<p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>*/}
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">How I use your information</h2>
                                <p>I use the information collected in various ways, including to:</p>
                                <ul>
                                    <li>Provide, operate, and maintain the website</li>
                                    <li>Improve, personalize, and expand the website</li>
                                    <li>Understand and analyze how you use the website</li>
                                    <li>Develop new products, services, features, and functionality</li>
                                    <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                                    {/*<li>Send you emails</li>*/}
                                    <li>Find and prevent fraud</li>
                                </ul>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">Log Files</h2>
                                <p><strong>{url}</strong> follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">Cookies and Web Beacons</h2>
                                <p>Like any other website, <strong>{url}</strong> uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                                <p>More information about which cookies are used, how they are used and what they do, can be found at the <NavLink to="/cookies">Cookie Policy</NavLink>.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">Advertising Partners Privacy Policies</h2>
                                <p>You may consult this list to find the Privacy Policy for each of the advertising partners of <strong>{url}</strong>.</p>
                                <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on <strong>{url}</strong>, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
                                <p>Note that <strong>{url}</strong> has no access to or control over these cookies that are used by third-party advertisers.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">Third Party Privacy Policies</h2>
                                <p><strong>{url}</strong>'s Privacy Policy does not apply to other advertisers or websites. Thus, I'm advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.</p>
                                <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                                <p>Under the CCPA, among other rights, California consumers have the right to:</p>
                                <ul>
                                    <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                                    <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                                    <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
                                </ul>
                                <p>If you make a request, I have one month to respond to you. If you would like to exercise any of these rights, please contact me.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">GDPR Data Protection Rights</h2>
                                <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                                <ul>
                                    <li><span className="underline">The right to access</span> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                                    <li><span className="underline">The right to rectification</span> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                                    <li><span className="underline">The right to erasure</span> – You have the right to request that we erase your personal data, under certain conditions.</li>
                                    <li><span className="underline">The right to restrict processing</span> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                                    <li><span className="underline">The right to object to processing</span> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                                    <li><span className="underline">The right to data portability</span> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                                </ul>
                                <p>If you make a request, I have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
                            </div>
                            <div className="prose max-w-none dark:prose-invert lg:prose-l mb-4">
                                <h2 className="font-medium font-title my-2">Children's Information</h2>
                                <p>Another part of my priority is adding protection for children while using the internet. I encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
                                <p><strong>{url}</strong> does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, I strongly encourage you to contact us immediately and I will do our best efforts to promptly remove such information from my records.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Privacy;
