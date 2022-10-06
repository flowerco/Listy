import supertest from "./mockServer";

const mockUser = {
  username: "testUser",
  email: "test@email.com",
  password: "GregorIsAsleep",
  followers: { ["another"]: [] },
  following: { ["someOther"]: [] },
};

// afterEach(async () => {
//   await User.deleteMany();
// });

// test register and getAllUser
describe("Test Handlers", function () {
  it("create user", async () => {
    const response = await supertest.post("/register").send(mockUser);

    console.log("Response body: ", response.body);
    expect(response.status).toEqual(200);

    it("responds to get /", async () => {
      const response = await supertest.get("/users/all");

      expect(response.status).toBe(200);
      expect(response.body.results[0].username).toBe("testUser");
      expect(response.body.email).toBe("test@email.com");
      expect(response.body.password).toBe("GregorIsAsleep");
      expect(response.body.followers).toMatchObject("['another']:[]");
      expect(response.body.following).toMatchObject("['someOther']:[]");
    });
  });
  //GetByNameOrId

  // test deleteUser
  describe("DELETE /delete-user returns success", () => {
    it("DELETE /delete-user successfully should return a success status", async () => {
      // add user to the database
      const addUserResponse = await supertest
        .post("/register")
        .send(mockUser)
        .set("Accept", "application/json");
      expect(addUserResponse.statusCode).toBe(201);
      // delete user
      const deleteRes = await supertest
        .delete("/deleteUser")
        .send(mockUser)
        .set("Accept", "application/json");
      expect(deleteRes.statusCode).toBe(204);
    });
  });
});
