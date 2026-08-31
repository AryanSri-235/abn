import { AppData } from '@/types';

export const initialData: AppData = {
  company: {
    name: "Abn Thermocare System",
    logo: "/images/img_3.JPG",
    tagline: "Leading Manufacturer & Service Provider of Utility Pipeline, Thermal Insulation, Electric Heaters & Industrial Chimneys",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    address: "Plot No. 45, Industrial Area, Phase-2, Greater Noida, Uttar Pradesh - 201306, India",
    rating: 5.0,
    reviewCount: 1,
    yearsInBusiness: 15,
    gstVerified: true,
    gstNumber: "09**********1Z8",
    gstRegistrationDate: "2017",
    phonePrimary: "+91 98112 23344",
    phoneSecondary: "+91 98765 43210",
    email: "contact@abnthermocare.com",
    whatsapp: "919811223344",
    natureOfBusiness: "Service Provider and Others",
    legalStatus: "Proprietorship",
    employeeCount: "11 to 25 People",
    heroBackground: "/images/img_20.jpg",
    clientele: ["Indian Oil", "HPCL", "MPNL - Delhi"],
  },
  about: {
    description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
    fullDescription: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney, Utility Pipeline Installation Service, Steam Pipe Insulation Service, Fire Alarm Systems, and Turnkey Electrical Projects. We work with high engineering precision adhering to industrial safety and client specifications across India.',
    establishedYear: 2011,
    ceoName: "Beena",
    annualTurnover: "Rs. 2 - 5 Crore",
    mission: "To deliver high quality thermal insulation, utility piping, custom heating, and chimney systems adhering to industrial safety and engineering standards.",
    additionalBusiness: [
      "Retail Business",
      "Service Provision",
      "Works Contract",
      "Supplier of Services"
    ],
    companyImages: [
      "/images/img_5.jpg",
      "/images/img_20.jpg",
      "/images/img_35.jpg"
    ]
  },
  products: [
    // 1. Installation Service
    {
      id: "prod-1",
      title: "Utility Pipeline Installation Service",
      category: "Installation Service",
      categorySummary: "Our product range includes a wide range of Utility Pipeline Installation Service and Storage Tanks Installation Service.",
      description: "Utility Pipeline Installation Service is provided by us and executed by our hard working professionals. Established in the year 2011 at Greater Noida, Uttar Pradesh We “M/S ABN Thermocare System” are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.",
      image: "/images/img_5.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "50",
      subServices: [
        "Utility Pipeline Installation Service",
        "Storage Tanks Installation Service"
      ],
      available: true,
      specifications: {
        "Time Duration": "Given Time",
        "Feature": "Cost Effectively",
        "Service Location": "On Site"
      }
    },
    {
      id: "prod-2",
      title: "Storage Tanks Installation Service",
      category: "Installation Service",
      categorySummary: "Our product range includes a wide range of Utility Pipeline Installation Service and Storage Tanks Installation Service.",
      description: "We are masters in providing Storage Tanks Installation Service to customers. Established in the year 2011 at Greater Noida, Uttar Pradesh We “M/S ABN Thermocare System” are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.",
      image: "/images/img_35.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "2",
      subServices: [
        "Utility Pipeline Installation Service",
        "Storage Tanks Installation Service"
      ],
      available: true,
      specifications: {
        "Material": "Mild Steel",
        "Service Location": "On Site",
        "Time Duration": "Given Time",
        "Feature": "Cost Effectively"
      }
    },

    // 2. Insulation Service
    {
      id: "prod-3",
      title: "Steam Pipe Insulation Service",
      category: "Insulation Service",
      categorySummary: "We are a leading Manufacturer of Steam Pipe Insulation Service and Hot And Cold Thermal Insulation Service from Greater Noida, India.",
      description: 'At most reasonable rates, we are providing Steam Pipe Insulation Service to our patrons.Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_4.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "50",
      subServices: [
        "Steam Pipe Insulation Service",
        "Hot And Cold Thermal Insulation Service"
      ],
      available: true,
      specifications: {
        "Service Location/City": "On site",
        "Time Duration": "Given Time",
        "Feature": "Cost Effectively"
      }
    },
    {
      id: "prod-4",
      title: "Hot And Cold Thermal Insulation Service",
      category: "Insulation Service",
      categorySummary: "We are a leading Manufacturer of Steam Pipe Insulation Service and Hot And Cold Thermal Insulation Service from Greater Noida, India.",
      description: 'To meet the various requirements of the customers, we are involved in providing Hot And Cold Thermal Insulation Service. Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_36.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "100",
      subServices: [
        "Steam Pipe Insulation Service",
        "Hot And Cold Thermal Insulation Service"
      ],
      available: true,
      specifications: {
        "Service Location": "On Site",
        "Time Duration": "Given Time",
        "Feature": "Cost Effectively"
      }
    },

    // 3. Electric Heater
    {
      id: "prod-5",
      title: "Electric Suction Heater",
      category: "Electric Heater",
      categorySummary: "Our range of products include Electric Suction Heater, Industrial Oil Immersion Heaters, Band Heater and Ceramic Infrared Heater.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_21.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "2",
      subServices: [
        "Electric Suction Heater",
        "Industrial Oil Immersion Heaters",
        "Band Heater",
        "Ceramic Infrared Heater"
      ],
      available: true,
      specifications: {
        "Size": "2 feet ( Length)",
        "Voltage": "220 V",
        "Heater Material": "Aluminium",
        "Power": "36 kW",
        "Frequency": "50 Hz",
        "Power Source": "Electric"
      }
    },
    {
      id: "prod-6",
      title: "Industrial Oil Immersion Heaters",
      category: "Electric Heater",
      categorySummary: "Our range of products include Electric Suction Heater, Industrial Oil Immersion Heaters, Band Heater and Ceramic Infrared Heater.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_37.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "Electric Suction Heater",
        "Industrial Oil Immersion Heaters",
        "Band Heater",
        "Ceramic Infrared Heater"
      ],
      available: true,
      specifications: {
        "Power": "40 kW",
        "Voltage": "220 V",
        "Size": "6 feet ( Length)",
        "Country of Origin": "Made in India",
        "Frequency": "50 Hz",
        "Power Source": "Electric"
      }
    },
    {
      id: "prod-7",
      title: "Band Heater",
      category: "Electric Heater",
      categorySummary: "Our range of products include Electric Suction Heater, Industrial Oil Immersion Heaters, Band Heater and Ceramic Infrared Heater.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_38.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "Electric Suction Heater",
        "Industrial Oil Immersion Heaters",
        "Band Heater",
        "Ceramic Infrared Heater"
      ],
      available: true,
      specifications: {
        "Heater Material": "Customise",
        "Voltage": "Customise",
        "Power": "Customise",
        "Size": "Customise",
        "Shape": "Customise",
        "Product Type": "Customise",
        "Packaging Type": "Customise",
        "Country of Origin": "Made in India"
      }
    },
    {
      id: "prod-8",
      title: "Ceramic Infrared Heater",
      category: "Electric Heater",
      categorySummary: "Our range of products include Electric Suction Heater, Industrial Oil Immersion Heaters, Band Heater and Ceramic Infrared Heater.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_39.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "10",
      subServices: [
        "Electric Suction Heater",
        "Industrial Oil Immersion Heaters",
        "Band Heater",
        "Ceramic Infrared Heater"
      ],
      available: true,
      specifications: {
        "Heater Material": "Customise",
        "Power": "Customise",
        "Voltage": "Customise",
        "Color": "Customise",
        "Size": "Customise",
        "Temperature": "Customise",
        "Frequency": "Customise",
        "Packaging Type": "Customise",
        "Country of Origin": "Made in India"
      }
    },

    // 4. Fire Alarm System Service
    {
      id: "prod-9",
      title: "Fire Alarm System Service",
      category: "Fire Alarm System Service",
      categorySummary: "Manufacturer of a wide range of products which include Fire Alarm System Service.",
      description: 'By using advanced technology, we are involved in providing Fire Alarm System Service. Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_6.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1 System",
      subServices: [
        "Fire Alarm System Service"
      ],
      available: true,
      specifications: {
        "Feature": "Cost Effectively",
        "Service Location": "On Site",
        "Time Duration": "Given Time"
      }
    },

    // 5. Industrial Chimney
    {
      id: "prod-10",
      title: "Mild Steel Industrial Chimney",
      category: "Industrial Chimney",
      categorySummary: "Offering you a complete choice of products which include Mild Steel Industrial Chimney, Self Supported Chimney and Industrial Chimney.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_9.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "Mild Steel Industrial Chimney",
        "Self Supported Chimney",
        "Industrial Chimney"
      ],
      available: true,
      specifications: {
        "Material": "Mild Steel",
        "Chimney Height": "40m",
        "Suction Capacity": "500 m3/h",
        "Noise Level": "40 dB",
        "Technique": "Hot Rolled"
      }
    },
    {
      id: "prod-11",
      title: "Self Supported Chimney",
      category: "Industrial Chimney",
      categorySummary: "Offering you a complete choice of products which include Mild Steel Industrial Chimney, Self Supported Chimney and Industrial Chimney.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_40.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1 Stack",
      subServices: [
        "Mild Steel Industrial Chimney",
        "Self Supported Chimney",
        "Industrial Chimney"
      ],
      available: true,
      specifications: {
        "Material": "Mild Steel",
        "Chimney Height": "40m",
        "Suction Capacity": "0-500 (m3/h)",
        "Noise Level": "40db",
        "Country of Origin": "Made in India",
        "Technique": "Hot Rolled"
      }
    },
    {
      id: "prod-12",
      title: "Industrial Chimney",
      category: "Industrial Chimney",
      categorySummary: "Offering you a complete choice of products which include Mild Steel Industrial Chimney, Self Supported Chimney and Industrial Chimney.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_41.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "Mild Steel Industrial Chimney",
        "Self Supported Chimney",
        "Industrial Chimney"
      ],
      available: true,
      specifications: {
        "Chimney Height": "100 m",
        "Suction Capacity": "800 m3/h",
        "Technique": "Cold Rolled"
      }
    },

    // 6. Turnkey Electrical Project Service
    {
      id: "prod-13",
      title: "Turnkey Electrical Project Service",
      category: "Turnkey Electrical Project Service",
      categorySummary: "Providing you the best range of Turnkey Electrical Project Service with effective & timely delivery.",
      description: 'Our company is a master in providing Turnkey Electrical Project Service. Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_7.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "2",
      subServices: [
        "Turnkey Electrical Project Service"
      ],
      available: true,
      specifications: {
        "Features": "Cost Effectively",
        "Service Location": "On Site",
        "Time Duration": "Given Time"
      }
    },

    // 7. Heating Coil
    {
      id: "prod-14",
      title: "Mineral insulated Heating Coil",
      category: "Heating Coil",
      categorySummary: "Manufacturer of a wide range of products which include Mineral insulated Heating Coil.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_8.jpeg",
      price: "Rs 1,750 / Meter",
      minimumOrderQuantity: "1 Meter",
      subServices: [
        "Mineral insulated Heating Coil"
      ],
      available: true,
      specifications: {
        "Power Source": "Electric",
        "Shape": "Customise",
        "Material": "Stainless Steel",
        "Voltage": "Customise",
        "Color": "Customise",
        "Packaging Type": "Customise"
      }
    },

    // 8. Storage Tank
    {
      id: "prod-15",
      title: "Stainless Steel Chemical Storage Tank",
      category: "Storage Tank",
      categorySummary: "Our product range includes Stainless Steel Chemical Storage Tank and Mild Steel Chemical Storage Tank.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_11.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "2",
      subServices: [
        "Stainless Steel Chemical Storage Tank",
        "Mild Steel Chemical Storage Tank"
      ],
      available: true,
      specifications: {
        "Storage Capacity": "700 Litre",
        "Layer Type": "2 Layer",
        "Material": "Stainless Steel",
        "Storage Material": "Chemical",
        "Max Pressure": "120 psi",
        "Wall Thickness": "25 mm",
        "Finish Type": "Polished",
        "Technique": "Hot Rolled"
      }
    },
    {
      id: "prod-16",
      title: "Mild Steel Chemical Storage Tank",
      category: "Storage Tank",
      categorySummary: "Our product range includes Stainless Steel Chemical Storage Tank and Mild Steel Chemical Storage Tank.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_42.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "2",
      subServices: [
        "Stainless Steel Chemical Storage Tank",
        "Mild Steel Chemical Storage Tank"
      ],
      available: true,
      specifications: {
        "Capacity": "12000 Litre",
        "Materials": "Mild Steel",
        "Storage Material": "Chemicals/Oils",
        "Surface Finishing": "Color Coated",
        "Max Pressure": "200 psi",
        "Technique": "Hot Rolled",
        "Diameter": "6 feet"
      }
    },

    // 9. Electrical Control Panel
    {
      id: "prod-17",
      title: "Electrical Distribution Control Panel",
      category: "Electrical Control Panel",
      categorySummary: "Offering high performance Electrical Distribution Control Panel and Dc Starter Control Panels.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_44.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "Electrical Distribution Control Panel",
        "Dc Starter Control Panels"
      ],
      available: true,
      specifications: {
        "Degree of Protection": "IP 55",
        "Power": "3 kW",
        "Operating Voltage": "240 V",
        "Phase": "1 - Phase",
        "Rated Current": "11 Amp",
        "Ambient Temperature": "35 Degree Celsius",
        "Automation Grade": "Semi Automatic",
        "Body Material": "Mild Steel",
        "Frequency Range": "50 Hz",
        "Surface Finishing": "Powder Coated",
        "Size": "4 x 2 feet"
      }
    },
    {
      id: "prod-18",
      title: "Dc Starter Control Panels",
      category: "Electrical Control Panel",
      categorySummary: "Offering high performance Electrical Distribution Control Panel and Dc Starter Control Panels.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_43.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "Electrical Distribution Control Panel",
        "Dc Starter Control Panels"
      ],
      available: true,
      specifications: {
        "Material": "Customise",
        "Usage/Application": "Customise",
        "Color": "Customise",
        "Country of Origin": "Made in India"
      }
    },

    // 10. Stainless Steel Conveyor
    {
      id: "prod-19",
      title: "Stainless Steel Roller Conveyor",
      category: "Stainless Steel Conveyor",
      categorySummary: "Manufacturer of Stainless Steel Roller Conveyor for heavy duty material handling.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_10.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "10",
      subServices: [
        "Stainless Steel Roller Conveyor"
      ],
      available: true,
      specifications: {
        "Speed": "0-1 m/s",
        "Automation Grade": "Semi-automatic",
        "Length": "10 feet",
        "Material": "Stainless Steel ( Roller)",
        "Capacity": "10 kg per feet",
        "Material Grade": "SS 304",
        "Finishing": "Color Coated",
        "Roller Diameter": "1.5 inch"
      }
    },

    // 11. Ms Tanks
    {
      id: "prod-20",
      title: "Industrial Cylindrical Tanks",
      category: "Ms Tanks",
      categorySummary: "Manufacturer & Supplier of Industrial Cylindrical Tanks for water and liquid storage.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_45.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "Industrial Cylindrical Tanks"
      ],
      available: true,
      specifications: {
        "Capacity": "Customise",
        "Usage/Application": "Customise",
        "Storage Material": "Customise",
        "Material": "Customise",
        "Storage Capacity": "Customise",
        "Color": "Customise",
        "Brand": "Customise",
        "Size": "Customise"
      }
    },

    // 12. Solar Power Plant
    {
      id: "prod-21",
      title: "Solar Power Plant",
      category: "Solar Power Plant",
      categorySummary: "We are a leading Manufacturer of Solar Power Plant from Greater Noida, India.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_46.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1 System",
      subServices: [
        "Solar Power Plant"
      ],
      available: true,
      specifications: {
        "Capacity": "Customised",
        "Other Components": "All Installation Material Etc.",
        "Type Of Plant": "Grid Tie, Off Grid",
        "Usage/Application": "ALL",
        "Operating Voltage": "24 V"
      }
    },

    // 13. HSD Underground Tank (Standalone Category)
    {
      id: "prod-22",
      title: "HSD Underground Tank",
      category: "HSD Underground Tank",
      categorySummary: "Manufacturer & Supplier of HSD Underground Tank for fuel, water and liquid storage.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_48.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "HSD Underground Tank"
      ],
      available: true,
      specifications: {
        "Storage Capacity": "6000 Litre",
        "Material": "Mild Steel",
        "Height": "5 feet",
        "Max Pressure": "110 psi",
        "Wall Thickness": "30 mm",
        "Length": "10 feet",
        "Technique": "Hot Rolled"
      }
    },

    // 14. Stainless Steel Flat Belt Conveyor (Standalone Category)
    {
      id: "prod-23",
      title: "Stainless Steel Flat Belt Conveyor",
      category: "Stainless Steel Flat Belt Conveyor",
      categorySummary: "Manufacturer of Stainless Steel Flat Belt Conveyor for industrial conveying.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_49.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "10",
      subServices: [
        "Stainless Steel Flat Belt Conveyor"
      ],
      available: true,
      specifications: {
        "Material": "Stainless Steel (Frame)",
        "Belt Width": "12 inch",
        "Belt Thickness": "2 mm",
        "Tensile Strength": "80 MPa",
        "Speed": "0-1 m/s",
        "Automation Grade": "Semi-automatic",
        "Length": "4 feet",
        "Material Grade": "SS 304",
        "Color": "White (Belt)",
        "Height": "3 feet",
        "Capacity": "20 kg/m"
      }
    },

    // 15. Flexible Heating Jacket (Standalone Category)
    {
      id: "prod-24",
      title: "Flexible Heating Jacket",
      category: "Flexible Heating Jacket",
      categorySummary: "Manufacturer of Flexible Heating Jacket for industrial barrel & vessel thermal heating.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_50.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "10",
      subServices: [
        "Flexible Heating Jacket"
      ],
      available: true,
      specifications: {
        "Usage/Application": "Heating",
        "Material": "Polyester (Jacket)",
        "Power": "1.2 kW",
        "Color": "Black",
        "Temperature Range": "40 to 250 Degree Celsius"
      }
    },

    // 16. Heat Trace Cable (Standalone Category)
    {
      id: "prod-25",
      title: "Heat Trace Cable",
      category: "Heat Trace Cable",
      categorySummary: "Manufacturer of Heat Trace Cable for pipeline freeze protection and temperature maintenance.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_51.png",
      price: "Ask Price",
      minimumOrderQuantity: "50",
      subServices: [
        "Heat Trace Cable"
      ],
      available: true,
      specifications: {
        "Material": "all",
        "Color": "all",
        "Usage/Application": "Power Supply",
        "Frequency": "50 Hz",
        "Power/Voltage": "220 V",
        "Country of Origin": "Made in India"
      }
    },

    // 17. Fire Fighting System AMC Service (Standalone Category)
    {
      id: "prod-29",
      title: "Fire Fighting Systems AMC Service",
      category: "Fire Fighting System AMC Service",
      categorySummary: "Offering Fire Fighting Systems AMC Service for industrial warehouses and commercial plants.",
      description: "Fire Fighting Systems AMC Service is provided by us and executed by our hard working professionals. Established in the year 2011 at Greater Noida, Uttar Pradesh We “M/S ABN Thermocare System” are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.",
      image: "/images/img_52.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "2",
      subServices: [
        "Fire Fighting Systems AMC Service"
      ],
      available: true,
      specifications: {
        "Service Location": "On Site",
        "Time Duration": "Given Time",
        "Feature": "Cost Effectively"
      }
    },

    // 18. Fire Fighting Service (Standalone Category)
    {
      id: "prod-30",
      title: "Co2 Fire Fighting Service",
      category: "Fire Fighting Service",
      categorySummary: "Providing Co2 Fire Fighting Service to our patrons.",
      description: "At most reasonable rates, we are providing Co2 Fire Fighting Service to our patrons. Established in the year 2011 at Greater Noida, Uttar Pradesh We “M/S ABN Thermocare System” are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.",
      image: "/images/img_53.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1 System",
      subServices: [
        "Co2 Fire Fighting Service"
      ],
      available: true,
      specifications: {
        "Feature": "Cost Effectively",
        "Service Location": "On Site",
        "Time Duration": "Given Time"
      }
    },

    // 19. Duct (Standalone Category)
    {
      id: "prod-27",
      title: "Duct",
      category: "Duct",
      categorySummary: "Manufacturer & Service Provider of AC Air Ducting and Industrial Ducting Systems.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_54.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1 Unit",
      subServices: [
        "Duct"
      ],
      available: true,
      specifications: {
        "Power Source": "duct",
        "Usage/Application": "Industrial",
        "Shape": "all",
        "Country of Origin": "Made in India"
      }
    },

    // 20. Cathodic Protection Services (Standalone Category)
    {
      id: "prod-26",
      title: "Cathodic Protection Installation Service",
      category: "Cathodic Protection Services",
      categorySummary: "Providing Cathodic Protection Services for underground pipelines and oil & gas storage tanks.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_55.jpeg",
      price: "Ask Price",
      minimumOrderQuantity: "1 Service",
      subServices: [
        "Cathodic Protection Installation Service"
      ],
      available: true,
      specifications: {
        "Industry Type": "Oil, Gas, Petrochemical",
        "Cathode Protection Type": "Impressed Current Systems",
        "Installed Location": "Underground",
        "Required Site Service": "Corrosion"
      }
    },

    // 21. Electric Heaters (Standalone Category)
    {
      id: "prod-28",
      title: "Industrial Tank Heater",
      category: "Electric Heaters",
      categorySummary: "Manufacturer of Industrial Tank Heater for industrial fluid heating.",
      description: 'Established in the year 2011 at Greater Noida, Uttar Pradesh We "M/S ABN Thermocare System" are a Sole Proprietorship based firm, engaged as the foremost Manufacturer And Service Provider of Mild Steel Storage Tank, Electric Heater, Industrial Chimney and many more.',
      image: "/images/img_38.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "1",
      subServices: [
        "Industrial Tank Heater"
      ],
      available: true,
      specifications: {
        "Size": "Customise",
        "Country of Origin": "Made in India"
      }
    },
    {
      id: "prod-31",
      title: "Fire Extinguisher Refilling Service",
      category: "New Products & Services",
      categorySummary: "Provider of Fire Extinguisher Refilling Service.",
      description: "Fire Extinguisher Refilling Service Fire Extinguisher Refilling Service",
      image: "/images/img_58.jpg",
      price: "Ask Price",
      minimumOrderQuantity: "50",
      subServices: [
        "Fire Extinguisher Refilling Service"
      ],
      available: true,
      specifications: {
        "Capacity": "10 Kg",
        "Service Type": "Customised"
      }
    }
  ],
  photos: [
    {
      id: "photo-1",
      title: "Steam Pipe Insulation Execution",
      category: "Insulation Service",
      image: "/images/img_4.jpg",
      description: "Rockwool lagging with aluminum cladding."
    },
    {
      id: "photo-2",
      title: "Fire Alarm Control Panel",
      category: "Fire Alarm Service",
      image: "/images/img_6.jpg",
      description: "Fire alarm system installation."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Ajay Vishwakarma",
      company: "Industrial Client",
      location: "Bhilai, Chhattisgarh",
      productName: "Insulated Heating Cables",
      rating: 5,
      comment: "Executes high quality insulated heating cable projects on schedule with great technical accuracy.",
      date: "11-July-23"
    }
  ],
  hsnCodes: [
    {
      id: "hsn-1",
      code: "40092200",
      description: "Tubes, pipes and hoses, of vulcanised rubber other than hard rubber, with or without their fittings (for example, joints, elbows, flanges) - reinforced or otherwise combined only with metal : with fittings"
    },
    {
      id: "hsn-2",
      code: "55151190",
      description: "Other woven fabrics of synthetic staple fibres - of polyester staple fibres : mixed mainly or solely with viscose rayon staple fibres : other"
    },
    {
      id: "hsn-3",
      code: "73110090",
      description: "Containers for compressed or liquefied gas, of iron or steel - containers for compressed or liquefied gas, of iron or steel : other"
    },
    {
      id: "hsn-4",
      code: "84191920",
      description: "Machinery, plant or laboratory equipment, whether or not electrically heated (excluding furnaces, ovens and other equipment of heading 8514), for the treatment of materials by a process involving a change of temperature such as heating, cooking, roasting, distilling, rectifying, sterilising, pasteurising, steaming, drying, evaporating, vaporising, condensing or cooling, other than machinery or plant of a kind used for domestic purposes; instantaneous or storage water heaters, non-electric - instantaneous gas water heaters : other: other"
    },
    {
      id: "hsn-5",
      code: "87163900",
      description: "Trailers and semi-trailers; other vehicles, not mechanically propelled; parts thereof other trailers and semi-trailers for the transport of goods : other"
    }
  ],
  inquiries: [
    {
      id: "inq-1",
      name: "Suresh Agarwal",
      phone: "9876543210",
      notes: "Need price quote for 10,000L Mild Steel Underground Fuel Storage Tank with installation at Dadri.",
      productTitle: "Underground Fuel Storage Tank",
      productCategory: "Storage Tanks",
      productImage: "/images/img_4.jpg",
      date: "01-Sep-2026"
    },
    {
      id: "inq-2",
      name: "Vikram Mehta",
      phone: "9811223344",
      notes: "Inquiry for Steam Pipe Thermal Insulation for 500m chemical pipeline.",
      productTitle: "Steam Pipe Insulation Service",
      productCategory: "Thermal Insulation",
      productImage: "/images/img_13.jpg",
      date: "31-Aug-2026"
    }
  ]
};
