import router from "../router";
import { agent as request } from "supertest";
import { User } from "../models/User";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const HOSTNAME = "localhost";
const PORT = 3001;
const mockUser = {
  username: "testUser",
  email: "test@email.com",
  password: "GregorIsAsleep",
  followers: { ["another"]: [] },
  following: { ["someOther"]: [] },
};

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(router);

// afterEach(async () => {
//   await User.deleteMany();
// });

// test register and getAllUser
describe("POST /register endpoint with user details", () => {
  it("POST /register should create a user with a success response", async () => {
    const response = await request(app)
      .post("/register")
      .send(mockUser)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toBe("testUser");
    expect(response.body.email).toBe("test@email.com");
    expect(response.body.password).toBe("GregorIsAsleep");
    expect(response.body.followers).toMatchObject("['another']:[]");
    expect(response.body.following).toMatchObject("['someOther']:[]");
    // test getAllUser function
    const getAllUserResponse = await request(app).get("/users/all");
    expect(getAllUserResponse.statusCode).toBe(200);
  });
});

//GetByNameOrId

// test deleteUser
describe("DELETE /delete-user returns success", () => {
  it("DELETE /delete-user successfully should return a success status", async () => {
    // add user to the database
    const addUserResponse = await request(app)
      .post("/register")
      .send(mockUser)
      .set("Accept", "application/json");
    expect(addUserResponse.statusCode).toBe(201);
    // delete user
    const deleteRes = await request(app)
      .delete("/deleteUser")
      .send(mockUser)
      .set("Accept", "application/json");
    expect(deleteRes.statusCode).toBe(204);
  });
});
//toggleFollowUser
