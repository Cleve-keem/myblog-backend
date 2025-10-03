import * as bcrypt from "bcrypt";

export default async function hashPassword(password: string) {
  const saltRounds = await bcrypt.genSalt(
    process.env.NODE_ENV === "production" ? 10 : 8
  );
  return await bcrypt.hash(password, saltRounds);
}
