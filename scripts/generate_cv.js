const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createCV() {
  const pdfDoc = await PDFDocument.create();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const primaryBlue = rgb(0.35, 0.58, 0.88); // #5994e0
  const darkText = rgb(0.1, 0.1, 0.1);
  const mutedText = rgb(0.25, 0.25, 0.25);
  const linkBlue = rgb(0.08, 0.35, 0.75);

  // Load profile photo if exists
  let profileImageEmbed = null;
  const imagePath = path.join(__dirname, '..', 'public', 'profile-khalid.jpg');
  if (fs.existsSync(imagePath)) {
    const imageBytes = fs.readFileSync(imagePath);
    profileImageEmbed = await pdfDoc.embedJpg(imageBytes);
  }

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const margin = 48;
  const contentWidth = pageWidth - margin * 2;

  // Helper to draw section header with blue bar
  function drawSectionHeader(page, y, title) {
    page.drawRectangle({
      x: margin,
      y: y - 5,
      width: contentWidth,
      height: 22,
      color: primaryBlue,
    });
    page.drawText(title, {
      x: margin + 8,
      y: y,
      size: 11,
      font: fontBold,
      color: rgb(1, 1, 1),
    });
    return y - 24;
  }

  // Helper to draw wrapped text
  function drawWrappedText(page, text, x, y, width, font, size, color, lineHeight) {
    const words = text.split(' ');
    let currentLine = '';
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth > width && currentLine) {
        page.drawText(currentLine, {
          x,
          y: currentY,
          size,
          font,
          color,
        });
        currentLine = words[i];
        currentY -= lineHeight;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      page.drawText(currentLine, {
        x,
        y: currentY,
        size,
        font,
        color,
      });
      currentY -= lineHeight;
    }

    return currentY;
  }

  // ==========================================
  // PAGE 1
  // ==========================================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin - 10;

  // Header - Name
  page1.drawText('Md. Khalid Hasan', {
    x: margin,
    y: y,
    size: 16,
    font: fontBold,
    color: darkText,
  });
  y -= 16;

  // Contact details
  const contactLines = [
    'Terokhadia, Rajshahi',
    '+8801568966255',
    'hasankhalid16648@gmail.com',
    'https://github.com/KHR47',
    'https://www.linkedin.com/in/khr47/',
  ];

  for (let line of contactLines) {
    const isLink = line.startsWith('http') || line.includes('@');
    page1.drawText(line, {
      x: margin,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: isLink ? linkBlue : mutedText,
    });
    y -= 13;
  }

  // Embed Photo top right
  if (profileImageEmbed) {
    const imgDims = profileImageEmbed.scaleToFit(90, 110);
    page1.drawImage(profileImageEmbed, {
      x: pageWidth - margin - imgDims.width,
      y: pageHeight - margin - imgDims.height - 10,
      width: imgDims.width,
      height: imgDims.height,
    });
    page1.drawRectangle({
      x: pageWidth - margin - imgDims.width - 1,
      y: pageHeight - margin - imgDims.height - 11,
      width: imgDims.width + 2,
      height: imgDims.height + 2,
      borderColor: rgb(0.7, 0.7, 0.7),
      borderWidth: 1,
    });
  }

  y = pageHeight - margin - 110;

  // Career Objective
  y = drawSectionHeader(page1, y, 'CAREER OBJECTIVE');
  const objText =
    'Final-semester CSE student at AIUB (CGPA 3.83/4.00) with hands-on experience building web applications and RESTful APIs using ASP.NET Core, Node.js, and NestJS. Proficient in JavaScript (ES6), TypeScript, and C#. Passionate about backend architecture and scalable systems, and eager to contribute creativity and engineering discipline to a growth-oriented team';
  y = drawWrappedText(page1, objText, margin, y, contentWidth, fontRegular, 9.5, darkText, 13);
  y -= 8;

  // Academic Projects Header
  y = drawSectionHeader(page1, y, 'ACADEMIC PROJECTS');

  const page1Projects = [
    {
      title: 'FinTrack — A Personal Finance Tracker',
      desc: 'Developed a web-based personal finance tracker using HTML, CSS, JavaScript, PHP, and MySQL, allowing users to record income, track expenses, and manage their overall spending.',
      github: 'https://github.com/KHR47/FinTrack',
    },
    {
      title: 'AirSense — Air Quality Monitoring Web Application',
      desc: 'Developed a full-stack web application using HTML, CSS, JavaScript, PHP, and MySQL that lets users view and track AQI data for different cities through an interactive interface.',
      github: 'https://github.com/KHR47/AirSense',
    },
    {
      title: 'ShopCore — E-Commerce Backend System',
      desc: 'Developed a RESTful backend API for an e-commerce platform using ASP.NET Core Web API, supporting product management and order handling. Tested and verified API endpoints using Postman to ensure proper functionality and performance.',
      github: 'https://github.com/KHR47/ShopCore',
    },
    {
      title: 'Library Management System',
      desc: 'Developed using C# and Microsoft SQL Server. Allows admin to manage books, students and borrow/return records. Features include student profiles, issue or return book tracking, and notifications.',
      github: 'https://github.com/KHR47/TourEase',
    },
    {
      title: 'The Markentile - An Online Shopping Hub',
      desc: 'Built a Java Swing desktop app that works like an online supermarket. Users can easily browse and buy groceries, food, and skincare products through a simple interface. It demonstrates basic shopping features along with Java GUI and object-oriented programming concepts.',
      github: 'https://github.com/KHR47/The-Markentile',
    },
    {
      title: 'TourEase — A Tourist Management Database System',
      desc: 'TourEase is a database project built using SQL to manage travel-related information in an organized way. It stores and handles data like tourists, bookings, hotels, and payments using a structured database system.',
      github: 'https://github.com/KHR47/TourEase',
    },
  ];

  for (let proj of page1Projects) {
    page1.drawText(`•  ${proj.title}`, {
      x: margin,
      y: y,
      size: 9.5,
      font: fontBold,
      color: darkText,
    });
    y -= 12;

    y = drawWrappedText(page1, proj.desc, margin + 12, y, contentWidth - 12, fontRegular, 9, mutedText, 12);

    page1.drawText(`GitHub: ${proj.github}`, {
      x: margin + 12,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: linkBlue,
    });
    y -= 14;
  }

  // Footer Page 1
  page1.drawText('Page | 1', {
    x: margin,
    y: 28,
    size: 9,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  // ==========================================
  // PAGE 2
  // ==========================================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - margin - 10;

  const page2Projects = [
    {
      title: 'NikunjaScape — A Computer Graphics Simulation',
      desc: 'A computer graphics simulation built using C++ with OpenGL and GLUT. It creates a realistic view of Nikunja 1 & 2 with roads, buildings, vehicles, and simple animations like moving traffic and day/night changes.',
      github: 'https://github.com/KHR47/NikunjaScape',
    },
    {
      title: 'PyCart — Console-Based E-Commerce System',
      desc: 'Built a modular console-based e-commerce system in Python with a FastAPI backend to manage products, customers, and orders through CRUD operations.',
      github: 'https://github.com/KHR47/PyCart',
    },
    {
      title: 'TextGuard — AI Content Detection System',
      desc: 'Developed an NLP-based system using Python and transformer models (BERT and RoBERTa) to detect whether text is human-written or AI-generated',
      github: 'https://github.com/KHR47/TextGuard',
    },
  ];

  for (let proj of page2Projects) {
    page2.drawText(`•  ${proj.title}`, {
      x: margin,
      y: y2,
      size: 9.5,
      font: fontBold,
      color: darkText,
    });
    y2 -= 12;

    y2 = drawWrappedText(page2, proj.desc, margin + 12, y2, contentWidth - 12, fontRegular, 9, mutedText, 12);

    page2.drawText(`GitHub: ${proj.github}`, {
      x: margin + 12,
      y: y2,
      size: 8.5,
      font: fontRegular,
      color: linkBlue,
    });
    y2 -= 16;
  }

  y2 -= 8;

  // Educational Qualifications Header
  y2 = drawSectionHeader(page2, y2, 'EDUCATIONAL QUALIFICATIONS');

  // Education Item 1 - BSc
  page2.drawText('Bachelor of Science (B.Sc.) in Computer Science & Engineering', {
    x: margin,
    y: y2,
    size: 10,
    font: fontBold,
    color: darkText,
  });
  page2.drawText('2022-2026', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2022-2026', 10),
    y: y2,
    size: 10,
    font: fontBold,
    color: darkText,
  });
  y2 -= 13;

  page2.drawText('American International University - Bangladesh (AIUB)', {
    x: margin,
    y: y2,
    size: 9.5,
    font: fontRegular,
    color: mutedText,
  });
  y2 -= 13;

  page2.drawText('CGPA: (3.84 out of 4.00)', {
    x: margin,
    y: y2,
    size: 9.5,
    font: fontRegular,
    color: mutedText,
  });
  y2 -= 18;

  // Education Item 2 - HSC
  page2.drawText('Higher Secondary Certificate (HSC)', {
    x: margin,
    y: y2,
    size: 10,
    font: fontBold,
    color: darkText,
  });
  page2.drawText('2020', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2020', 10),
    y: y2,
    size: 10,
    font: fontBold,
    color: darkText,
  });
  y2 -= 13;

  page2.drawText('Rajshahi New Govt. Degree College, Rajshahi', {
    x: margin,
    y: y2,
    size: 9.5,
    font: fontRegular,
    color: mutedText,
  });
  y2 -= 13;

  page2.drawText('GPA: 5.00 (out of 5.00)', {
    x: margin,
    y: y2,
    size: 9.5,
    font: fontRegular,
    color: mutedText,
  });
  y2 -= 18;

  // Education Item 3 - SSC
  page2.drawText('Secondary School Certificate (SSC)', {
    x: margin,
    y: y2,
    size: 10,
    font: fontBold,
    color: darkText,
  });
  page2.drawText('2018', {
    x: pageWidth - margin - fontBold.widthOfTextAtSize('2018', 10),
    y: y2,
    size: 10,
    font: fontBold,
    color: darkText,
  });
  y2 -= 13;

  page2.drawText('Rajshahi Collegiate School, Rajshahi', {
    x: margin,
    y: y2,
    size: 9.5,
    font: fontRegular,
    color: mutedText,
  });
  y2 -= 13;

  page2.drawText('GPA: 5.00 (out of 5.00)', {
    x: margin,
    y: y2,
    size: 9.5,
    font: fontRegular,
    color: mutedText,
  });
  y2 -= 22;

  // Skills Header
  y2 = drawSectionHeader(page2, y2, 'SKILLS');

  const skillsList = [
    { label: 'Languages', items: 'HTML, CSS, JavaScript (ES6), TypeScript, Python, C#, PHP, Java, C++' },
    { label: 'Backend', items: 'Node.js, NestJS, ASP.NET Core' },
    { label: 'Databases', items: 'MySQL, MS SQL Server, PostgreSQL' },
    { label: 'Tools', items: 'Git, GitHub, Postman' },
    { label: 'Networking', items: 'Cisco Packet Tracer' },
  ];

  for (let skill of skillsList) {
    page2.drawText(`•  ${skill.label}  >`, {
      x: margin,
      y: y2,
      size: 9.5,
      font: fontBold,
      color: darkText,
    });

    const labelWidth = fontBold.widthOfTextAtSize(`•  ${skill.label}  >`, 9.5);
    page2.drawText(skill.items, {
      x: margin + labelWidth + 6,
      y: y2,
      size: 9.5,
      font: fontRegular,
      color: mutedText,
    });
    y2 -= 15;
  }

  // Footer Page 2
  page2.drawText('Page | 2', {
    x: margin,
    y: 28,
    size: 9,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '..', 'public', 'resume.pdf');
  const namedOutputPath = path.join(__dirname, '..', 'public', 'Md_Khalid_Hasan_CV.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  fs.writeFileSync(namedOutputPath, pdfBytes);
  console.log('Successfully generated CV PDF at:', outputPath, 'and', namedOutputPath);
}

createCV().catch((err) => {
  console.error('Error generating CV PDF:', err);
  process.exit(1);
});
