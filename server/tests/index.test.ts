import app from "../index";
import { describe, expect, it, test } from "@jest/globals";
import { agent as request } from "supertest";
import { MongoClient } from "mongodb";

describe("Post /users", () => {
  describe("given a username and password", () => {
    it("should save the username and password to the database", () => {});

    it("should send back the encrypted user ID as a JSON Web Token", () => {});

    it("should respond with a status code 200", async () => {
      const response = await request(app).post("/register").send({
        username: "Test",
        password: "AlsoTest",
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
