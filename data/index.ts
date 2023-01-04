import people from "./people.json";
import colleges from "./colleges.json";
import passwords from "./passwords.json";

const getRandomFrom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const AREA_CODES = ["205", "251", "256", "334"];

const randomPhone = () => getRandomFrom(people).phone.replace(/\d{3}/, getRandomFrom(AREA_CODES));

const NOs = ["NO", "no", "No", "No", "No", "N/A", "None"];
const YESes = ["YES", "yes", "YES", "Yes"];

const localPeople = people.map(person => ({
    ...person,
    joint: `${person.first_name} ${person.last_name}`,
    email_name: `${person.first_name[0]}${Math.random() > 0.2 ? "_" : ""}${person.last_name.substring(0, 6)}${Math.random() > 0.5 ? Math.floor(Math.random() * 20) : ""}`.toLowerCase(),
    alt_email_name: `${person.first_name[0]}${Math.random() > 0.2 ? "_" : ""}${person.last_name.substring(0, 6)}${Math.random() > 0.5 ? Math.floor(Math.random() * 20) : ""}`.toLowerCase(),
    phone: person.phone.replace(/\d{3}/, getRandomFrom(AREA_CODES))
}));

const college = () => getRandomFrom(colleges);
const person = () => getRandomFrom(localPeople);
const password = () => getRandomFrom(passwords);
const no = () => getRandomFrom(NOs);
const yes = () => getRandomFrom(YESes);

export default {
    college,
    person,
    password,
    phone: randomPhone,
    no,
    yes
};
