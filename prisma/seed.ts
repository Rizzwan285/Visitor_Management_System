import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create ADMIN user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@vms.iitpkd.ac.in' },
        update: {},
        create: {
            email: 'admin@vms.iitpkd.ac.in',
            name: 'System Admin',
            password: adminPassword,
            role: UserRole.ADMIN,
            domain: 'GENERIC',
            designation: 'System Administrator',
            isActive: true,
        },
    });
    console.log(`✅ Admin user created: ${admin.email}`);

    // Create SECURITY user
    const securityPassword = await bcrypt.hash('security123', 12);
    const security = await prisma.user.upsert({
        where: { email: 'security@vms.iitpkd.ac.in' },
        update: {},
        create: {
            email: 'security@vms.iitpkd.ac.in',
            name: 'Gate Security',
            password: securityPassword,
            role: UserRole.SECURITY,
            domain: 'GENERIC',
            designation: 'Security Personnel',
            isActive: true,
        },
    });
    console.log(`✅ Security user created: ${security.email}`);

    console.log('🌱 Seeding complete.');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
