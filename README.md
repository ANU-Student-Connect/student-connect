<div>
    <header>
        <h1>Student Connect</h1>
    </header>
    <p>
        [Student Connect][studentconnectweb] is a platform for ANU students to connect with each other with their interests.
    </p>
</div>

This is the development version of the Student Connect website. 
<!-- [studentconnectweb]: https://studentconnect.anu.edu.au/ -->

### Requirements
<!-- - Docker and Docker Compose installed on your system -->
- Git for cloning the repository
- Node.js and npm installed on your system

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/student-connect.git
cd student-connect
```

2. Install the dependencies:
```bash
cd client
npm install
cd ..
cd server
npm install
cd ..
```

3. Run the app:
Open a terminal and run the following commands:
```bash
cd client
npm run dev
```
In a separate terminal, run the following commands:
```bash
cd server       
npm run server
```

4. Open your browser and navigate to `http://localhost:3000` to view the app.
<!-- 1. Build and run the Docker containers:
```bash
docker compose up --build
``` -->

## Features
- ANU User authentication
- Interest-based friend suggestions
- Peer-to-peer chat


