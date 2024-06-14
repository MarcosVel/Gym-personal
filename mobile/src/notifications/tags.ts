import { OneSignal } from "react-native-onesignal";
import { api } from "../services/api";

export function userNameTag(name: string) {
  OneSignal.User.addTag("user_name", name.split(" ")[0]);
}

export function userIsLogged(isLogged: boolean) {
  OneSignal.User.addTag("user_is_logged", isLogged.toString());
}

export async function userDaysWithoutTrainingTag() {
  const { data } = await api.get("/history");

  if (!data) return;

  function parseDate(lastTrainingDate: string): Date {
    let [day, month, year] = lastTrainingDate.split(".").map(Number);
    return new Date(year, month - 1, day); // month is 0-based in JavaScript Date
  }

  let latestTrainingDate = parseDate(data[0].title);

  const today = new Date();

  // Convert Date objects to numeric values representing the milliseconds since the Unix epoch
  const timeDifference = today.getTime() - latestTrainingDate.getTime();

  // Convert time difference from milliseconds to days
  const daysSinceLastTraining = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24)
  );

  OneSignal.User.addTag(
    "days_since_last_training",
    daysSinceLastTraining.toString()
  );
}
