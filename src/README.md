
# Expo Workshop – Group Activity 

##  Goal

Your group will collaboratively build a single Expo app containing **multiple tabs**. Each tab will be created by a different team member and will showcase a different **native Expo API**.

After individual work, you will **merge your work into one shared app**.

---

## Group Structure

* Each group member receives **one API card** containing an Expo feature.
* Available APIs include:

  * Haptics
  * Camera
  * Video
  * Sensors
  * Location
* Each person builds their feature **independently** for 15 minutes.
* After that, your group has **5 minutes** to merge everything into one app.

---

#  Step-by-Step Activity Flow

### **1. Clone the starter repository (we provide a URL).**

Example:

```bash
git clone  my-expo-group
cd my-expo-group
```

### **2. Remove the existing .git folder**

This ensures the project is no longer a Git repo.

```bash
rm -rf .git
```

### **3. One team member initializes a fresh Git repo**

```bash
git init
git add .
git commit -m "Initial commit"
```

This member then shares the repo (GitHub/GitLab/etc.) so others can pull/push.

### **4. Each team member creates their tab**

Inside the `app` directory, create a folder with the name of your API:

```
/app/haptics/index.tsx
/app/camera/index.tsx
/app/video/index.tsx
/app/sensors/index.tsx
/app/location/index.tsx
```

Your API card explains what to build.

### **5. Run the app**

```bash
docker build -t expo-workshop:latest .
docker compose -f compose.yaml up
```
Or 
```bash
docker compose up --build
```
Each person develops their tab independently.

### **6. Merge your code as a group (5 minutes)**

* Ensure all tabs appear in the app’s tab navigation
* Run the app to confirm all features work together
* Help each other fix small issues

### **7. Optional:** Test on Expo Go (for those who have it)
