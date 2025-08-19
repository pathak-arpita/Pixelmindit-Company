# 🌟 About This Project

---

## 🚀 How to Run the Project

Follow these steps to get the project up and running on your local machine:

1.  **Clone the Repository:**
    To get a copy of the project, **clone the repository** using the command:
    `git clone https://github.com/pathak-arpita/Pixelmindit-Company.git`
    After cloning, navigate into the project directory.

2.  **Install Dependencies:**
    Once inside the project folder, **install all required Node.js modules** by running:
    `npm install`

3.  **Start the Development Server:**
    To **start the application in development mode**, execute:
    `npm run dev`
    Then, open your web browser and go to `http://localhost:3000` to view the app.

4.  **Create a Production Build:**
    If you want to **create a production-ready build** of the application, first run:
    `npm run build`
    After the build is complete, you can serve the optimized app by running:
    `npm start`

<br><br>
    

## ✨ Features

Here is a list of the key features implemented in this application:

### Task Management
* **Adding Tasks:** You can add new tasks with a **title** and a **description**.
* **Drag-and-Drop:** Tasks can be easily moved between the three columns ("To Do," "In Progress," and "Done") using **drag-and-drop** functionality.
* **Task Details & Editing:** Each task has properties for its **title**, **description**, **priority** (Low, Medium, High), and **due date**. You can **edit** these details and also **delete** tasks.

### Data Persistence
* **Local Storage:** All task data is saved to and loaded from your browser's **localStorage**. This ensures the board's state is preserved even after you refresh the page.

### Filtering & Sorting
* **Filtering:** A dedicated panel allows you to filter tasks based on different criteria, including:
    * All tasks
    * Only high-priority tasks
    * Tasks due today
* **Sorting:** Within each column, you can **sort** tasks by their **due date** or **priority**.

### Extra Features
* **Dark Mode:** You can toggle between **light and dark modes**. Your preference is saved in local storage.
* **Search:** A **search bar** is included to help you quickly find tasks by their title.
* **Progress Bar:** A small **progress bar** at the top of the board displays the percentage of tasks that are in the 'Done' column.


<br><br>

### 🚧 Challenges and Solutions

---

**1. Implementing Drag-and-Drop Functionality**

One of the main challenges was implementing the drag-and-drop feature, as I had no prior experience with it.

* **Challenge:** I had to learn how to manage the state and logic for moving tasks between different columns. Using a library like `@hello-pangea/dnd` simplified the process, but I still had to understand its core concepts, such as `Droppable` and `Draggable` components, and how they interact to update the application's state correctly.
* **Solution:** I started by studying the documentation and examples provided by the library. I broke the problem down into smaller steps:
    1.  Wrapping the entire board in a `DragDropContext`.
    2.  Defining each column as a `Droppable` area.
    3.  Making each task a `Draggable` item.
    4.  Writing the `onDragEnd` function to handle the logic for updating the state based on where the task was dropped. This function checked whether the task was dropped in the same column or a different one and updated the state accordingly, which then re-rendered the board with the new task order.

**2. Managing State for Task Operations**

Another challenge was effectively managing the state for all task-related operations, including adding, editing, and deleting tasks.

* **Challenge:** The application's state needed to be a single source of truth that could be easily updated from different parts of the application. For example, when a user edits a task, the change needs to be reflected not only in the task's details but also in the correct column on the board.
* **Solution:** I used a centralized state management approach. The main `App` component held the primary task data (an object where keys were column IDs and values were arrays of tasks). All functions for adding, editing, and deleting tasks were defined in this main component and passed down as props to the child components (e.g., the `Column` or `Task` components). When an action occurred in a child component (like a click on the edit button), it called the corresponding function passed down from the parent, which updated the central state. This ensured data consistency across the entire application.

This approach helped maintain a predictable and reliable flow of data, making it easier to manage complex interactions like dragging a task and then immediately editing its details.