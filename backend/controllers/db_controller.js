const { ref, set, get, child } = require("firebase/database");
const { dbRef, db } = require("../utils/utils");
const { UserDb } = require("../models/user");
const auth_controller = require("../controllers/auth_controller");

exports.signup = async (req, res) => {
  console.log(req.body);
  if (req.body.type === "caretaker") {
    await caretakerSignup(req, res);
  } else {
    await patientSignupValidate(req, res);
  }
};
exports.login = async (req, res) => {};
async function patientSignupValidate(req, res) {
  const users = await getDatabaseUsers();
  const val = isUserInDb(users, req.body.email);
  if (!val) {
    res.send(true);
  } else {
    res.send(false);
  }
}
async function caretakerSignup(req, res) {
  const users = await getDatabaseUsers();
  const val = isUserInDb(users, req.body.email);
  if (!val) {
    let my_user = new UserDb(
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.type,
      [],
      [],
      ""
    );
    await writeUserData(users.length, my_user, req.body.password, res);
  } else {
    res.send(false);
  }
}
async function getDatabaseUsers() {
  let my_users = [];
  await get(child(dbRef, `users`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        console.log("database accessed");
        my_users = snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("error is:\n" + error);
    });
  return my_users;
}
function isUserInDb(users, email) {
  let flag = 0;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) flag = 1;
  }
  if (flag == 1) {
    console.log("false");

    return true;
  } else {
    console.log("true");
    return false;
  }
}
async function writeUserData(userId, user, password, res) {
  console.log("writing users data");
  console.log(user);
  await set(ref(db, "users/" + userId), user);
  auth_controller.addUserToFbAuth(res, user.email, password);
  console.log("added");
}
