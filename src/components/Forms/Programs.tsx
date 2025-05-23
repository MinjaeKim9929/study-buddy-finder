const programsList = [
	{ code: 'AAT2', name: 'Aviation Technician & Aircraft Maintenance' },
	{ code: 'AAT3', name: 'Aviation Technician & Avionics Maintenance' },
	{ code: 'ABU1', name: 'Academic Upgrading' },
	{ code: 'ADP2', name: 'Advanced Digital Photography (Unavailable for Applications)' },
	{ code: 'ADV1', name: 'Adventure Expeditions and Interpretive Leadership' },
	{ code: 'AET1', name: 'Agricultural Equipment Technician' },
	{ code: 'AET2', name: 'Agricultural Equipment Technician & John Deere Ag Tech' },
	{ code: 'AFM1', name: 'Applied Aerospace Manufacturing (Suspended)' },
	{ code: 'AFM2', name: 'Advanced Filmmaking' },
	{ code: 'AFL1', name: 'Acting for Screen and Stage' },
	{ code: 'ALD1', name: 'Advanced Live Digital Media Production' },
	{ code: 'AMH1', name: 'Addictions and Mental Health' },
	{ code: 'AMM1', name: 'Applied Mechanical Design' },
	{ code: 'ANA3', name: 'Anesthesia Assistant (Unavailable for Applications)' },
	{ code: 'ANI1', name: 'Animation' },
	{ code: 'AOP1', name: 'Aerospace Operations Management' },
	{ code: 'AOT1', name: 'Auto Body Repair Techniques' },
	{ code: 'APS1', name: 'Advanced Police Studies (Suspended)' },
	{ code: 'APT1', name: 'Automotive Service Technician Apprenticeship' },
	{ code: 'AST1', name: 'Automotive Service Technician' },
	{ code: 'AVF1', name: 'Aviation Technology & Aircraft Maintenance and Avionics (Advanced Diploma)' },
	{ code: 'AVT2', name: 'Aviation Technology & Aircraft Maintenance and Avionics (Co-op)' },
	{ code: 'BAA2', name: 'Business & Accounting' },
	{ code: 'BAE2', name: 'Business & Entrepreneurship and Management' },
	{ code: 'BAF2', name: 'Business & Finance' },
	{ code: 'BAH1', name: 'Business & Human Resources' },
	{ code: 'BAI2', name: 'Business & Insurance' },
	{ code: 'BAL2', name: 'Business & Logistics and Supply Chain Management' },
	{ code: 'BAM2', name: 'Business & Marketing' },
	{ code: 'BAS2', name: 'Business' },
	{ code: 'BBD4', name: 'Honours Bachelor of Applied Technology & Biotechnology' },
	{ code: 'BBM4', name: 'Honours Bachelor of Commerce (Accounting)' },
	{ code: 'BDM4', name: 'Honours Bachelor of Commerce (Digital Marketing)' },
	{ code: 'BHM4', name: 'Honours Bachelor of Commerce (Human Resources Management)' },
	{ code: 'BIA1', name: 'Business and Information Systems Architecture' },
	{ code: 'BIS1', name: 'Business & Insurance (Co-op)' },
	{ code: 'BLC1', name: 'Business & Logistics and Supply Chain Management (Co-op)' },
	{ code: 'BMG4', name: 'Honours Bachelor of Commerce (Management)' },
	{ code: 'BMK1', name: 'Business & Marketing (Co-op)' },
	{ code: 'BMS1', name: 'Business Management (London South Campus, Suspended)' },
	{ code: 'BRT1', name: 'Brewer Technician' },
	{ code: 'BRT3', name: 'Broadcasting & Television and Film Production' },
	{ code: 'BRR2', name: 'Broadcasting & Radio and Media Production (Suspended)' },
	{ code: 'CAS1', name: 'Cannabis Applied Science (Suspended)' },
	{ code: 'CIM1', name: 'CNC Industrial Machining' },
	{ code: 'CIM2', name: 'CNC Industrial Machining (Co-op)' },
	{ code: 'CJS2', name: 'Community Justice Services' },
	{ code: 'CNS1', name: 'Computer Systems Technician' },
	{ code: 'CNT2', name: 'Computer Systems Technology' },
	{ code: 'CPM1', name: 'Construction Project Management (Suspended)' },
	{ code: 'CUL1', name: 'Culinary Management' },
	{ code: 'CYA1', name: 'Cyber Security' },
	{ code: 'CYW3', name: 'Child and Youth Care' },
	{ code: 'DEN1', name: 'Dental Hygiene' },
	{ code: 'DSW1', name: 'Developmental Services Worker' },
	{ code: 'ECE1', name: 'Early Childhood Education' },
	{ code: 'ECM1', name: 'Electrician (Construction and Maintenance) Apprenticeship' },
	{ code: 'ELN2', name: 'Electronics and Embedded Systems Development' },
	{ code: 'ELT1', name: 'Electrical Techniques' },
	{ code: 'EMG2', name: 'Emergency Medical Services & Graduate Certificate (Unavailable for Applications)' },
	{ code: 'ESD2', name: 'Embedded Systems Development (Unavailable for Applications)' },
	{ code: 'FAA3', name: 'Fine Art (Suspended)' },
	{ code: 'FID1', name: 'Fashion Design' },
	{ code: 'FIM1', name: 'Fashion Marketing and Management' },
	{ code: 'FIR1', name: 'Fire Safety Systems' },
	{ code: 'FSM1', name: 'Food Service Management' },
	{ code: 'GCM1', name: 'General Carpenter Apprenticeship' },
	{ code: 'GDE3', name: 'Graphic Design' },
	{ code: 'GMT1', name: 'General Machinist Apprenticeship' },
	{ code: 'HCA1', name: 'Health Care Administration Management' },
	{ code: 'HMT1', name: 'Hospitality and Tourism Management' },
	{ code: 'IDP3', name: 'Interior Decorating' },
	{ code: 'IMS1', name: 'Information Security Management (Unavailable for Applications)' },
	{ code: 'INV1', name: 'Investment Management' },
	{ code: 'IWD2', name: 'Web Development and Internet Applications' },
	{ code: 'IWD3', name: 'Web Development and Internet Applications (Co-op)' },
	{ code: 'JTD1', name: 'Journalism & Television and Digital News (Suspended)' },
	{ code: 'LDC1', name: 'Landscape Design' },
	{ code: 'MAC1', name: 'Manufacturing Engineering Technician' },
	{ code: 'MAE4', name: 'Manufacturing Engineering Technology' },
	{ code: 'MGS1', name: 'Global Business Management' },
	{ code: 'MHT3W', name: 'Massage Therapy (Unavailable for Applications)' },
	{ code: 'MOT2', name: 'Motive Power Technician & Automotive' },
	{ code: 'MOT3', name: 'Motive Power Technician & Diesel' },
	{ code: 'MPR1', name: 'Music Industry Arts' },
	{ code: 'MQC1S', name: 'Quality Control and Assurance (Unavailable for Applications)' },
	{ code: 'MRI1', name: 'Magnetic Resonance Imaging (Unavailable for Applications)' },
	{ code: 'MRT1', name: 'Medical Radiation Technology (Unavailable for Applications)' },
	{ code: 'MTT1', name: 'Mechanical Technician & CNC' },
	{ code: 'MTT2', name: 'Mechanical Technician & CNC (Co-op)' },
	{ code: 'NUR1', name: 'Practical Nursing' },
	{ code: 'NUR4', name: 'Bachelor of Science in Nursing (Collaborative with Western University)' },
	{ code: 'OHS1', name: 'Occupational Health and Safety Management' },
	{ code: 'OPM2', name: 'Operations Management' },
	{ code: 'PAL1', name: 'Palliative Care' },
	{ code: 'PHS2', name: 'Pre-Health Sciences Pathway to Advanced Diplomas and Degrees' },
	{ code: 'PMI2', name: 'Project Management' },
	{ code: 'PRC1', name: 'Public Relations - Corporate Communications (Suspended)' },
	{ code: 'PRM1', name: 'Retirement Residence Management (Suspended)' },
	{ code: 'PSA1', name: 'Public Safety Administration' },
	{ code: 'PSA2', name: 'Public Safety Administration (Co-op)' },
	{ code: 'RAC1', name: 'Residential Air Conditioning Systems Mechanic Apprenticeship' },
	{ code: 'RAF1', name: 'Regulatory Affairs and Quality Operations' },
	{ code: 'RPN1', name: 'Registered Practical Nursing' },
	{ code: 'RRT1', name: 'Respiratory Therapy' },
	{ code: 'SCM2', name: 'Supply Chain Management & Logistics (Co-op)' },
	{ code: 'SDE1', name: 'Software Development' },
	{ code: 'SSW1', name: 'Social Service Worker' },
	{ code: 'SSW2', name: 'Social Service Worker (Fast Track)' },
	{ code: 'TAH1', name: 'Tourism and Hospitality' },
	{ code: 'THC1', name: 'Tourism and Hospitality (Co-op)' },
	{ code: 'THP1', name: 'Theatre Arts & Performance' },
	{ code: 'THT1', name: 'Theatre Arts & Technical Production' },
	{ code: 'TSM1', name: 'Truck and Coach Technician' },
	{ code: 'VGP1', name: 'Video Game Design and Production' },
	{ code: 'VGP2', name: 'Video Game Design and Production (Co-op)' },
	{ code: 'WFT1', name: 'Welding and Fabrication Technician' },
	{ code: 'WFT2', name: 'Welding and Fabrication Technician (Co-op)' },
];

export default programsList;
