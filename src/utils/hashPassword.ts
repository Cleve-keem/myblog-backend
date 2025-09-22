import * as bcrypt from "bcrypt";

export default async function hashPassword(password: string) {
  const saltRounds = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, saltRounds);
}
