import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_zru7XnkDc4gH@ep-summer-meadow-ax44bnfr-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('Connecting to Neon PostgreSQL database...');
  const client = await pool.connect();
  try {
    // 1. Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS company_info (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
        name TEXT NOT NULL,
        tagline TEXT,
        city TEXT,
        state TEXT,
        address TEXT,
        rating NUMERIC,
        review_count INT,
        years_in_business INT,
        gst_verified BOOLEAN,
        gst_number TEXT,
        gst_registration_date TEXT,
        phone_primary TEXT,
        phone_secondary TEXT,
        email TEXT,
        whatsapp TEXT,
        nature_of_business TEXT,
        legal_status TEXT,
        employee_count TEXT,
        hero_background TEXT
      );

      CREATE TABLE IF NOT EXISTS photos (
        id VARCHAR(100) PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        category_summary TEXT,
        description TEXT,
        image TEXT NOT NULL,
        price TEXT,
        minimum_order_quantity TEXT,
        specifications JSONB,
        sub_services JSONB,
        available BOOLEAN DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS hsn_codes (
        id VARCHAR(100) PRIMARY KEY,
        code VARCHAR(20) NOT NULL,
        description TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id VARCHAR(100) PRIMARY KEY,
        author TEXT NOT NULL,
        company TEXT,
        location TEXT,
        product_name TEXT,
        rating INT,
        comment TEXT,
        date TEXT
      );
    `);

    console.log('Tables created successfully.');

    // 2. Seed Photos
    const photosList = [
      {
        id: "photo-1",
        title: "Utility Pipeline Installation Site",
        category: "Installation Service",
        image: "/images/img_5.jpg",
        description: "Industrial boiler room utility piping execution by ABN Thermocare System."
      },
      {
        id: "photo-2",
        title: "Heavy Chemical Storage Tank Unit",
        category: "Installation Service",
        image: "/images/img_22.jpg",
        description: "Storage tank erection on site at Greater Noida industrial area."
      },
      {
        id: "photo-3",
        title: "Boiler Utility Line Setup",
        category: "Installation Service",
        image: "/images/img_20.jpg",
        description: "Turnkey utility line setup for industrial process steam."
      },
      {
        id: "photo-4",
        title: "Steam Pipe Rockwool Insulation Lagging",
        category: "Insulation Service",
        image: "/images/img_4.jpg",
        description: "High density rockwool insulation lagging with aluminum cladding."
      },
      {
        id: "photo-5",
        title: "Hot & Cold Refinery Pipeline Insulation",
        category: "Insulation Service",
        image: "/images/img_23.jpg",
        description: "Hydrocarbon refinery thermal lagging project."
      },
      {
        id: "photo-6",
        title: "Aluminium Metal Cladding Work",
        category: "Insulation Service",
        image: "/images/img_30.jpg",
        description: "22 SWG aluminum cladding on insulated steam lines."
      },
      {
        id: "photo-7",
        title: "Electric Suction Heater Unit",
        category: "Electric Heater",
        image: "/images/img_21.jpg",
        description: "Flanged electric suction heater for fuel oil pre-heating."
      },
      {
        id: "photo-8",
        title: "Industrial Oil Immersion Heater Elements",
        category: "Electric Heater",
        image: "/images/img_56.jpg",
        description: "Heavy duty immersion heating elements for oil baths."
      },
      {
        id: "photo-9",
        title: "Extrusion Ceramic Band Heater",
        category: "Electric Heater",
        image: "/images/img_50.jpg",
        description: "Ceramic band heater for high temperature plastic machinery."
      },
      {
        id: "photo-10",
        title: "Radiant Ceramic Infrared Heater",
        category: "Electric Heater",
        image: "/images/img_26.jpg",
        description: "Infrared radiant heater elements for thermoforming."
      },
      {
        id: "photo-11",
        title: "Self-Supported MS Chimney Stack",
        category: "Industrial Chimney",
        image: "/images/img_9.jpg",
        description: "30 Meter self-supported MS chimney stack erected at client facility."
      },
      {
        id: "photo-12",
        title: "Twin Flue Industrial Chimney",
        category: "Industrial Chimney",
        image: "/images/img_27.jpg",
        description: "Twin flue self-supporting industrial exhaust stack."
      },
      {
        id: "photo-13",
        title: "Stainless Steel Exhaust Chimney",
        category: "Industrial Chimney",
        image: "/images/img_28.jpg",
        description: "SS 304 chemical exhaust stack."
      },
      {
        id: "photo-14",
        title: "Addressable Fire Alarm Control Station",
        category: "Fire Alarm Service",
        image: "/images/img_6.jpg",
        description: "Turnkey fire alarm system installation."
      },
      {
        id: "photo-15",
        title: "Industrial LT Substation Cabling Project",
        category: "Turnkey Electrical",
        image: "/images/img_7.jpg",
        description: "LT switchgear panel wiring and turnkey electrical project."
      },
      {
        id: "photo-16",
        title: "Mineral Insulated Heating Coil Assembly",
        category: "Heating Coil",
        image: "/images/img_8.jpeg",
        description: "High temperature mineral insulated heat trace coil."
      },
      {
        id: "photo-17",
        title: "Stainless Steel Chemical Tank Vessel",
        category: "Storage Tank",
        image: "/images/img_11.jpg",
        description: "SS 316 chemical storage tank fabrication."
      },
      {
        id: "photo-18",
        title: "Mild Steel Chemical Storage Tank",
        category: "Storage Tank",
        image: "/images/img_29.jpg",
        description: "MS storage tank unit for industrial fluids."
      }
    ];

    for (const p of photosList) {
      await client.query(`
        INSERT INTO photos (id, title, category, image, description)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          image = EXCLUDED.image,
          description = EXCLUDED.description;
      `, [p.id, p.title, p.category, p.image, p.description]);
    }

    console.log(`Inserted ${photosList.length} photos into Neon PostgreSQL database!`);

  } catch (err) {
    console.error('Database init error:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
