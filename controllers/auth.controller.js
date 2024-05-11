const asyncHandler = require("../utils/asyncHandler");
const poolDB = require("../config/pg.config");
const { ApiError, InternalError, ApiResponse } = require("../utils/responses");
const validator = require("validator");
const bcrypt = require("bcryptjs");

exports.registerUser = asyncHandler(async (req, res) => {
  const client = await poolDB.connect();
  try {
    const { firstname, lastname, email, password, role } = req.body;

    if (!firstname || !email || !lastname) {
      return ApiError(res, 400, "All fields are required");
    }

    const existingUser = (
      await client.query(`select * from main.users where email = $1`, [
        email.trim().toLowerCase(),
      ])
    ).rows;

    if (existingUser.length !== 0) {
      return ApiResponse(res, 400, "Email is already registered");
    }

    const encPassword = await bcrypt.hash(password, 10);

    const usersQuery = `insert into main.users (
        firstname,
        lastname,
        email,
        password,
        role_id
    ) values ($1, $2, $3, $4, $5) returning *`;
    const usersData = [firstname, lastname, email, encPassword, role || 2];

    const userResponse = (await client.query(usersQuery, usersData)).rows[0];

    // delete password field
    delete userResponse.password;

    return ApiResponse(res, 200, "User created successfully", userResponse);
  } catch (error) {
    console.log("registerUser err:", error);
    InternalError(res);
  } finally {
    client.release();
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const client = poolDB.connect();
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return ApiError(res, 400, "All data is required");
    }

    const existingUser = (
      await client.query(
        `select * from main.users where email = '${email.toLowerCase().trim()}'`
      )
    ).rows[0];

    if (!existingUser) {
      return ApiError(res, 400, "No user found with email");
    }

    const isValidPassword = await bcrypt.compare(
      existingUser.password,
      password
    );

    if (!isValidPassword) {
    }
  } catch (error) {
    console.log("loginUser err:", error);
    return InternalError(res);
  } finally {
    client.release();
  }
});
