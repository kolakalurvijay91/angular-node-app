/// <reference types="mocha" />

import request from "supertest";
import { expect } from "chai";
import app from "../src/server";

describe("Health API", () => {
  it("should return API status as UP", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("UP");
  });
});
