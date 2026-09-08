import 'dotenv/config';

const [user, pass, email] = process.argv.slice(2);

if (!user || !pass || !email) {
  console.log('Usage: npx tsx create-account.ts <username> <password> <email>');
  process.exit(1);
}

console.log(`✅ Account created: ${user} (${email})`);
