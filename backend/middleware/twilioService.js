import twilio from 'twilio';

const accountSid = 'ACcbf0a874d2f0b8da811a0ce06419be28'
const authToken = '62b04bf4ea3246a57d21069f2ff1b89b'
const client = new twilio(accountSid, authToken);

export const sendOtp = async (to, OTP) => {
    try {
        const message = await client.verify.v2.services('VA48bff51acd339f9141226d7149510bfe')
        .verifications({
            body: `Your OTP code is ${OTP}`,
            to, // Text this number
            from: '+919526000801',
            channel : 'sms' // From a valid Twilio number
        });
        return console.log(message);
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP');
    }
};
