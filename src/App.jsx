import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Calendar, Clock, Target, Flame, Trophy, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const GateDailyTracker = () => {
  const [days, setDays] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);

  // --- 1. DATA LOADING (Updated to use localStorage) ---
  useEffect(() => {
    const loadData = () => {
      try {
        const savedData = localStorage.getItem('gate-daily-tasks-full');
        if (savedData) {
          const data = JSON.parse(savedData);
          setDays(data.days);
          setCurrentDay(data.currentDay);
        } else {
          setDays(initialDays);
          setCurrentDay(0);
        }
      } catch (error) {
        console.error("Error loading data", error);
        setDays(initialDays);
        setCurrentDay(0);
      }
    };
    loadData();
  }, []);

  // --- 2. DATA SAVING (Updated to use localStorage) ---
  const saveData = (newDays, newCurrentDay) => {
    try {
      localStorage.setItem('gate-daily-tasks-full', JSON.stringify({
        days: newDays,
        currentDay: newCurrentDay
      }));
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  // --- 3. LOGIC HANDLERS ---
  const toggleTask = (taskId) => {
    const newDays = [...days];
    const currentDayData = newDays[currentDay];
    const task = currentDayData.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setDays(newDays);
      saveData(newDays, currentDay);
    }
  };

  const toggleAptitude = () => {
    const newDays = [...days];
    const currentDayData = newDays[currentDay];
    currentDayData.dailyAptitude.completed = !currentDayData.dailyAptitude.completed;
    setDays(newDays);
    saveData(newDays, currentDay);
  };

  const navigateDay = (direction) => {
    let newDay = currentDay + direction;
    if (newDay >= 0 && newDay < days.length) {
      setCurrentDay(newDay);
      saveData(days, newDay);
    }
  };

  // --- 4. DATA (Truncated for space - The component will use the initialDays array below) ---
  const initialDays = [
    // PHASE 1: Foundation Reset (Days 1-7)
    {
      day: 1, date: "Dec 15", phase: "Phase 1: Foundation Reset", theme: "The Surgery (Pointers & Memory)",
      dailyAptitude: { topic: "Work and Time / Speed and Distance", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Fix deleteHead Bug", description: "Rewrite function using double pointer (**head) or return new head. Understand dangling pointer issue.", timeEstimate: "1 hour", type: "critical", completed: false },
        { id: 2, title: "Concept Drill: Pointers Deep Dive", description: "Study Pointers to Arrays vs Array of Pointers. Learn 3D array address calculation.", timeEstimate: "2 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: C Programming PYQs", description: "Solve 20 PYQs on Pointers & Recursion from GATE Overflow.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 2, date: "Dec 16", phase: "Phase 1: Foundation Reset", theme: "The Structure (Linked Lists & Stacks)",
      dailyAptitude: { topic: "Logical Reasoning (Seating/Blood Relations)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Concept: Linked List Reversal", description: "Learn iterative and recursive reversal by heart.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Concept: Stack Implementation", description: "Implement Stack using Queues. Learn Infix to Postfix/Prefix.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: LL & Stacks PYQs", description: "Solve 15 PYQs. Master Floyd's Cycle Detection.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
     {
      day: 3, date: "Dec 17", phase: "Phase 1: Foundation Reset", theme: "The Hierarchy (Trees & Heaps)",
      dailyAptitude: { topic: "Probability (Basics)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Concept: Binary Trees Properties", description: "Master height vs nodes formulas. Learn all traversals.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Concept: BST & Heaps", description: "Study BST deletion cases. Understand Heapify process.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Trees PYQs", description: "Solve 20 PYQs. Focus on AVL tree rotations.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 4, date: "Dec 18", phase: "Phase 1: Foundation Reset", theme: "The Logic (Discrete Math - Set Theory & Logic)",
      dailyAptitude: { topic: "Statistics (Mean, Median, Mode, SD)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Concept: Propositional Logic", description: "Master Tautology, Contradiction, Equivalence. Learn quantifiers.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Concept: Set Theory & Relations", description: "Study Power Sets, Relations (Reflexive, Symmetric, Transitive).", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Logic & Relations PYQs", description: "Solve 20 PYQs. Calculate reflexive relations.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 5, date: "Dec 19", phase: "Phase 1: Foundation Reset", theme: "The Network (Graph Theory - DM & DSA)",
      dailyAptitude: { topic: "Geometry / Mensuration", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Concept: Graph Theory (Math)", description: "Study Planar Graphs, Graph Coloring, Isomorphism.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Concept: Graph Algorithms", description: "Master BFS vs DFS and their applications.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Graph PYQs", description: "Solve 20 PYQs combining math and algorithm concepts.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 6, date: "Dec 20", phase: "Phase 1: Foundation Reset", theme: "The Algorithm (Asymptotic Analysis & D&C)",
      dailyAptitude: { topic: "Data Interpretation (Charts/Graphs)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Concept: Big O, Omega, Theta", description: "Rank functions. Memorize Master Theorem (3 cases).", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Concept: Recurrence Relations", description: "Solve recurrences using Substitution method.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Time Complexity PYQs", description: "Solve 15 'Find the Time Complexity' questions.", timeEstimate: "1.5 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 7, date: "Dec 21", phase: "Phase 1: Foundation Reset", theme: "The Checkpoint (Review & Test)",
      dailyAptitude: { topic: "Mixed Aptitude Practice", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Mock Test: C & Data Structures", description: "Take full subject test. Timed. No breaks.", timeEstimate: "1 hour", type: "test", completed: false },
        { id: 2, title: "Analysis & Error Log", description: "Analyze every error. Document mistakes.", timeEstimate: "1 hour", type: "review", completed: false },
        { id: 3, title: "Catch-up / Buffer Time", description: "Complete pending tasks or rest/revise.", timeEstimate: "2 hours", type: "buffer", completed: false }
      ]
    },

    // PHASE 2: Processing Core (Days 8-24)
    {
      day: 8, date: "Dec 22", phase: "Phase 2: Processing Core", theme: "The Greedy Strategy",
      dailyAptitude: { topic: "Numbers (Divisibility rules, Remainder)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Greedy Algorithms", description: "Fractional Knapsack, Huffman Coding tree building, Job Sequencing with Deadlines.", timeEstimate: "2 hours", type: "concept", completed: false },
        { id: 2, title: "MST Algorithms", description: "Prim's vs Kruskal's. Know time complexities.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Greedy PYQs", description: "Solve 15 PYQs on Huffman Coding and MST.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 9, date: "Dec 23", phase: "Phase 2: Processing Core", theme: "The Dynamic Approach",
      dailyAptitude: { topic: "Numbers (Last digit, Factors)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "DP Core Concepts", description: "Matrix Chain Multiplication (diagonal filling), LCS recursive formula, 0/1 Knapsack.", timeEstimate: "2 hours", type: "concept", completed: false },
        { id: 2, title: "Practice: DP Table Filling", description: "Solve 10 quality questions on filling DP tables.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 10, date: "Dec 24", phase: "Phase 2: Processing Core", theme: "Intractability & Hashing",
      dailyAptitude: { topic: "Percentage / Profit & Loss", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "P, NP, NP-Hard, NP-Complete", description: "Understand Euler diagram relations. Free marks!", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Hashing & Graph Traversals", description: "Collision Resolution (Chaining vs Open Addressing). DFS/BFS for Topological Sort.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: Mixed PYQs", description: "Solve 20 PYQs (Hashing + P/NP theory).", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 11, date: "Dec 25", phase: "Phase 2: Processing Core", theme: "The Manager (OS Basics)",
      dailyAptitude: { topic: "Ratio & Proportion", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Process State Diagram", description: "New -> Ready -> Run -> Wait. Understand transitions.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "CPU Scheduling", description: "FCFS, SJF (Preemptive/Non), Round Robin. Watch arrival time traps! fork() = 2^n - 1 children.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: Gantt Charts", description: "Solve 15 Gantt Chart problems. Calculate Turnaround Time.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 12, date: "Dec 26", phase: "Phase 2: Processing Core", theme: "The Traffic Controller (Synchronization)",
      dailyAptitude: { topic: "Mixtures & Alligations", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Critical Section Problem", description: "Mutual Exclusion, Progress, Bounded Waiting conditions.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Semaphores & Classical Problems", description: "Binary vs Counting. Producer-Consumer, Dining Philosophers, Reader-Writer.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: Semaphore Tracing", description: "Solve 15 PYQs tracing semaphore variable values.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 13, date: "Dec 27", phase: "Phase 2: Processing Core", theme: "The Gridlock (Deadlocks & Memory)",
      dailyAptitude: { topic: "Simple Interest / Compound Interest", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Deadlock Concepts", description: "4 Necessary Conditions. Banker's Algorithm safety sequence check.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Memory Management", description: "Paging (Logical vs Physical Address). Page Table structure.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Banker's & Paging", description: "Solve 10 Banker's Algo + 10 Paging numericals.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 14, date: "Dec 28", phase: "Phase 2: Processing Core", theme: "Checkpoint 2 (Algo + OS Test)",
      dailyAptitude: { topic: "Mixed Review", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Subject Test: Algo + OS", description: "Combined test. Timed.", timeEstimate: "1.5 hours", type: "test", completed: false },
        { id: 2, title: "Analysis", description: "If <60%, identify logic vs calculation errors.", timeEstimate: "1 hour", type: "review", completed: false },
        { id: 3, title: "Buffer Time", description: "Revise weak areas.", timeEstimate: "1.5 hours", type: "buffer", completed: false }
      ]
    },
    {
      day: 15, date: "Dec 29", phase: "Phase 2: Processing Core", theme: "The Data Blueprint (ER & Relational Model)",
      dailyAptitude: { topic: "Clocks & Calendars", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "ER Diagrams", description: "Weak Entities, Cardinality ratios.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Relational Algebra & TRC", description: "Select, Project, Joins (Natural vs Outer). Tuple Relational Calculus syntax.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: RA Conversions", description: "Solve 20 PYQs converting English to Relational Algebra.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 16, date: "Dec 30", phase: "Phase 2: Processing Core", theme: "The Language (SQL)",
      dailyAptitude: { topic: "Permutation & Combination (Basic)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "SQL Commands", description: "Group By, Having, Order By. All types of Joins.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Subqueries & Aggregates", description: "IN, EXISTS, ANY, ALL. COUNT, SUM, AVG (NULL handling).", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: SQL Output", description: "Solve 20 'Find the output' PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 17, date: "Dec 31", phase: "Phase 2: Processing Core", theme: "The Cleanup (Normalization)",
      dailyAptitude: { topic: "Probability (Coins/Dice)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Functional Dependencies", description: "Closure of attributes. Finding Candidate Keys.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Normal Forms", description: "1NF, 2NF, 3NF, BCNF. Lossless Join & Dependency Preserving.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Normal Form Questions", description: "Solve 15 'Find highest Normal Form' questions.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 18, date: "Jan 01", phase: "Phase 2: Processing Core", theme: "The Conflict (Transactions)",
      dailyAptitude: { topic: "Probability (Bayes/Conditional)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "ACID & Serializability", description: "ACID properties. Conflict Serializability (Precedence Graph).", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "File Organization", description: "B and B+ Trees. Insertion/Deletion rules. Order of tree.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Serializability", description: "Solve 15 PYQs on precedence graphs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 19, date: "Jan 02", phase: "Phase 2: Processing Core", theme: "The Circuit (Boolean Algebra & K-Maps)",
      dailyAptitude: { topic: "Time & Work (Pipes and Cisterns)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Boolean Algebra", description: "Laws (De Morgan's, Consensus Theorem).", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "K-Maps & Combinational Circuits", description: "4-variable maps. MUX function implementation.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: K-Maps & MUX", description: "Solve 20 PYQs. Focus on MUX questions.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 20, date: "Jan 03", phase: "Phase 2: Processing Core", theme: "The Memory (Sequential Circuits)",
      dailyAptitude: { topic: "Speed, Distance, Time (Trains/Boats)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Flip Flops", description: "JK, D, T. Characteristic Equations & Excitation Tables.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Counters", description: "Asynchronous vs Synchronous. Setup & Hold Time.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Counter MOD", description: "Solve 15 'Determine MOD of counter' questions.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 21, date: "Jan 04", phase: "Phase 2: Processing Core", theme: "The Floating Point (Number Systems)",
      dailyAptitude: { topic: "General Review of Weak Areas", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Number Systems", description: "Binary, Octal, Hex conversions. 2's Complement (Range).", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "IEEE 754", description: "Single Precision (32-bit). Sign, Exponent (Bias 127), Mantissa.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: IEEE 754", description: "Solve 10 conversion problems.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 22, date: "Jan 05", phase: "Phase 2: Processing Core", theme: "Checkpoint 3 (DBMS + Digital)",
      dailyAptitude: { topic: "Mixed Review", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Subject Test: DBMS + Digital", description: "Combined test. Timed.", timeEstimate: "1.5 hours", type: "test", completed: false },
        { id: 2, title: "Analysis", description: "Check BCNF logic and Counter tracing.", timeEstimate: "1 hour", type: "review", completed: false }
      ]
    },
    {
      day: 23, date: "Jan 06", phase: "Phase 2: Processing Core", theme: "Math Refresher (Calculus)",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Calculus Concepts", description: "Limits (L'Hospital Rule), Maxima/Minima, Mean Value Theorems.", timeEstimate: "2 hours", type: "concept", completed: false },
        { id: 2, title: "Practice: Calculus PYQs", description: "Solve 15 PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 24, date: "Jan 07", phase: "Phase 2: Processing Core", theme: "Math Refresher (Linear Algebra)",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Linear Algebra Concepts", description: "Rank, Determinants, Eigenvalues/Eigenvectors properties.", timeEstimate: "2 hours", type: "concept", completed: false },
        { id: 2, title: "Practice: LA PYQs", description: "Solve 15 PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },

    // PHASE 3: Hardware & Theory (Days 25-37)
    {
      day: 25, date: "Jan 08", phase: "Phase 3: Hardware & Theory", theme: "The Blueprint (Instructions & Addressing)",
      dailyAptitude: { topic: "Geometry (Triangles/Circles)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Instruction Formats", description: "0, 1, 2, 3 address instructions.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Addressing Modes", description: "Immediate, Direct, Indirect, Register, PC Relative, Base Register.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: Effective Address", description: "Solve 15 PYQs on address calculations.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 26, date: "Jan 09", phase: "Phase 3: Hardware & Theory", theme: "The Speed (Pipelining)",
      dailyAptitude: { topic: "Mensuration (Volume/Surface Area)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Pipeline Basics", description: "CPI, Throughput. Speedup formula S = Non-Pipeline Time / Pipeline Time.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Hazards & Stalls", description: "Structural, Data (RAW, WAR, WAW), Control. Calculating stall cycles.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Speedup Calculations", description: "Solve 15 PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 27, date: "Jan 10", phase: "Phase 3: Hardware & Theory", theme: "The Bottleneck (Cache Memory)",
      dailyAptitude: { topic: "Data Interpretation (Pie Charts)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Cache Mapping", description: "Direct, Associative, Set Associative. Address split: Tag | Set Index | Block Offset.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Replacement Policies", description: "LRU policy understanding.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Cache Numericals", description: "Solve 20 questions on Tag bits and Hit Ratio.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 28, date: "Jan 11", phase: "Phase 3: Hardware & Theory", theme: "The Machine (Finite Automata)",
      dailyAptitude: { topic: "Review Geometry/Mensuration", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "DFA vs NFA", description: "Equivalence. Minimization of DFA (Myhill-Nerode).", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Regular Expressions & Pumping Lemma", description: "Identity rules. Proving a language is NOT Regular.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Regular Languages", description: "Solve 20 'Is this language Regular?' PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 29, date: "Jan 12", phase: "Phase 3: Hardware & Theory", theme: "The Grammar (CFG & PDA)",
      dailyAptitude: { topic: "Logic (Syllogisms)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "CFG Concepts", description: "Ambiguity, Chomsky Normal Form (CNF).", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "PDA & Closure Properties", description: "DPDA vs NPDA power difference. Union, Intersection, Complement table.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Closure Properties", description: "Solve 15 PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 30, date: "Jan 13", phase: "Phase 3: Hardware & Theory", theme: "The Limit (Turing Machines)",
      dailyAptitude: { topic: "Logic (Statement & Assumption)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Turing Machines", description: "Recursive vs Recursively Enumerable.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Undecidability", description: "Halting Problem, Rice's Theorem. Countable vs Uncountable sets.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Decidability", description: "Solve 10 'Is this problem Decidable?' PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 31, date: "Jan 14", phase: "Phase 3: Hardware & Theory", theme: "The Translator (Lexical & Parsing)",
      dailyAptitude: { topic: "Series Completion", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Lexical Analysis", description: "Token counting.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Parsing Techniques", description: "LL(1): First & Follow Sets. LR(0), SLR(1), LALR(1), CLR(1) hierarchy.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: First & Follow", description: "Solve 15 PYQs on computing First/Follow and checking LL(1).", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 32, date: "Jan 15", phase: "Phase 3: Hardware & Theory", theme: "The Optimizer (Code Gen)",
      dailyAptitude: { topic: "Coding-Decoding", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "SDT Concepts", description: "Synthesized vs Inherited Attributes.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Intermediate Code & Optimization", description: "Three Address Code, SSA. Constant Folding, Dead Code Elimination.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: SDT Evaluation", description: "Solve 10 PYQs on evaluating SDT rules.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 33, date: "Jan 16", phase: "Phase 3: Hardware & Theory", theme: "The Connection (Layers & Framing)",
      dailyAptitude: { topic: "Venn Diagrams", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "OSI vs TCP/IP", description: "Layer differences.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 2, title: "Data Link Layer", description: "Framing, Error Control (CRC, Hamming), Flow Control (Stop & Wait). CSMA/CD.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 3, title: "Practice: CRC & Efficiency", description: "Solve 15 PYQs on CRC calculation and Stop & Wait efficiency.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 34, date: "Jan 17", phase: "Phase 3: Hardware & Theory", theme: "The Address (IP & Subnetting)",
      dailyAptitude: { topic: "Review Logic/Series", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "IPv4 Addressing", description: "Classful vs Classless (CIDR). Master subnet masks!", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Subnetting & Fragmentation", description: "Calculate First IP, Last IP, Broadcast IP. Offset calculations.", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: Subnetting Numericals", description: "Solve 20 subnetting questions.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 35, date: "Jan 18", phase: "Phase 3: Hardware & Theory", theme: "The Transport (TCP/UDP)",
      dailyAptitude: { topic: "Full 15-min Mix Test", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "TCP Concepts", description: "TCP Header, Flags (SYN, ACK, FIN). Congestion Control: AIMD, Slow Start.", timeEstimate: "1.5 hours", type: "concept", completed: false },
        { id: 2, title: "Routing Algorithms", description: "Distance Vector (Count to Infinity) vs Link State (Dijkstra).", timeEstimate: "1 hour", type: "concept", completed: false },
        { id: 3, title: "Practice: TCP Window", description: "Solve 15 PYQs on TCP window size changes.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 36, date: "Jan 19", phase: "Phase 3: Hardware & Theory", theme: "The Chance (Probability)",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Probability Deep Dive", description: "Conditional (Bayes), Random Variables (Expectation/Variance), Poisson & Exponential.", timeEstimate: "2 hours", type: "concept", completed: false },
        { id: 2, title: "Practice: Probability PYQs", description: "Solve 20 PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 37, date: "Jan 20", phase: "Phase 3: Hardware & Theory", theme: "Checkpoint 4 (Systems Test)",
      dailyAptitude: { topic: "Mixed Review", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Subject Test: COA + TOC + Compiler + CN", description: "Combined systems test. Timed.", timeEstimate: "2 hours", type: "test", completed: false },
        { id: 2, title: "Analysis", description: "Goal: >55%. Identify concept vs calculation errors.", timeEstimate: "1.5 hours", type: "review", completed: false }
      ]
    },

    // PHASE 4: Final Lap (Days 38-54)
    {
      day: 38, date: "Jan 21", phase: "Phase 4: The Final Lap", theme: "Full Mock Test 1",
      dailyAptitude: { topic: "Mixed Aptitude (All Topics)", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Full Length Mock Test 1", description: "3 hours. Actual exam time slot. All subjects.", timeEstimate: "3 hours", type: "test", completed: false },
        { id: 2, title: "Immediate Analysis", description: "Mark all errors. Time per question analysis.", timeEstimate: "1 hour", type: "review", completed: false }
      ]
    },
    {
      day: 39, date: "Jan 22", phase: "Phase 4: The Final Lap", theme: "Deep Analysis & Revision Day 1",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Error Analysis Deep Dive", description: "Document every mistake in error log. Why it happened.", timeEstimate: "2 hours", type: "review", completed: false },
        { id: 2, title: "Targeted Revision", description: "Revise weak topics identified from Mock 1.", timeEstimate: "3 hours", type: "concept", completed: false }
      ]
    },
    {
      day: 40, date: "Jan 23", phase: "Phase 4: The Final Lap", theme: "Full Mock Test 2",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Full Length Mock Test 2", description: "3 hours. Same exam time.", timeEstimate: "3 hours", type: "test", completed: false },
        { id: 2, title: "Quick Analysis", description: "Compare with Mock 1 performance.", timeEstimate: "1 hour", type: "review", completed: false }
      ]
    },
    {
      day: 41, date: "Jan 24", phase: "Phase 4: The Final Lap", theme: "Deep Analysis & Revision Day 2",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Error Analysis", description: "Focus on repeated mistakes between Mock 1 & 2.", timeEstimate: "2 hours", type: "review", completed: false },
        { id: 2, title: "Formula Sheet Review", description: "Go through all formula sheets for each subject.", timeEstimate: "3 hours", type: "concept", completed: false }
      ]
    },
    {
      day: 42, date: "Jan 25", phase: "Phase 4: The Final Lap", theme: "Full Mock Test 3",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Full Length Mock Test 3", description: "3 hours. Building stamina.", timeEstimate: "3 hours", type: "test", completed: false },
        { id: 2, title: "Performance Tracking", description: "Track score progression. Identify patterns.", timeEstimate: "1 hour", type: "review", completed: false }
      ]
    },
    {
      day: 43, date: "Jan 26", phase: "Phase 4: The Final Lap", theme: "Deep Analysis & Revision Day 3",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Comprehensive Error Review", description: "All 3 mocks combined analysis.", timeEstimate: "2 hours", type: "review", completed: false },
        { id: 2, title: "High-Weightage Topics", description: "Final revision of Algo, OS, Engg Math.", timeEstimate: "3 hours", type: "concept", completed: false }
      ]
    },
    {
      day: 44, date: "Jan 27", phase: "Phase 4: The Final Lap", theme: "Full Mock Test 4",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Full Length Mock Test 4", description: "3 hours. Peak performance mode.", timeEstimate: "3 hours", type: "test", completed: false },
        { id: 2, title: "Quick Review", description: "Only major errors. Don't overthink.", timeEstimate: "1 hour", type: "review", completed: false }
      ]
    },
    {
      day: 45, date: "Jan 28", phase: "Phase 4: The Final Lap", theme: "Deep Analysis & Revision Day 4",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Time Management Analysis", description: "Which sections took too long? Optimize strategy.", timeEstimate: "1.5 hours", type: "review", completed: false },
        { id: 2, title: "Conceptual Gaps", description: "Final deep dive on remaining weak areas.", timeEstimate: "3 hours", type: "concept", completed: false }
      ]
    },
    {
      day: 46, date: "Jan 29", phase: "Phase 4: The Final Lap", theme: "Full Mock Test 5",
      dailyAptitude: { topic: "Mixed Aptitude", questions: 15, timeLimit: "30 mins", completed: false },
      tasks: [
        { id: 1, title: "Full Length Mock Test 5", description: "3 hours. Final full test.", timeEstimate: "3 hours", type: "test", completed: false },
        { id: 2, title: "Confidence Check", description: "Light analysis. Focus on positives.", timeEstimate: "45 mins", type: "review", completed: false }
      ]
    },
    {
      day: 47, date: "Jan 30", phase: "Phase 4: The Final Lap", theme: "Final Mock Analysis",
      dailyAptitude: { topic: "Light Aptitude Practice", questions: 10, timeLimit: "20 mins", completed: false },
      tasks: [
        { id: 1, title: "All 5 Mocks Comparison", description: "Score trends, improvement areas, consistent strengths.", timeEstimate: "2 hours", type: "review", completed: false },
        { id: 2, title: "Exam Day Strategy", description: "Decide question order, time allocation, when to skip.", timeEstimate: "1 hour", type: "concept", completed: false }
      ]
    },
    {
      day: 48, date: "Jan 31", phase: "Phase 4: The Final Lap", theme: "Short Notes Loop Day 1",
      dailyAptitude: { topic: "Light Aptitude", questions: 10, timeLimit: "20 mins", completed: false },
      tasks: [
        { id: 1, title: "Formula Sheets: Engg Math + Algo", description: "Read only your short notes. No new material.", timeEstimate: "3 hours", type: "review", completed: false },
        { id: 2, title: "PYQ Pattern Recognition", description: "Skim through 2015-2020 PYQs for patterns.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 49, date: "Feb 01", phase: "Phase 4: The Final Lap", theme: "Short Notes Loop Day 2",
      dailyAptitude: { topic: "Light Aptitude", questions: 10, timeLimit: "20 mins", completed: false },
      tasks: [
        { id: 1, title: "Formula Sheets: OS + DBMS + Digital", description: "Quick revision from notes only.", timeEstimate: "3 hours", type: "review", completed: false },
        { id: 2, title: "PYQ Pattern Recognition", description: "Skim through 2021-2024 PYQs.", timeEstimate: "2 hours", type: "practice", completed: false }
      ]
    },
    {
      day: 50, date: "Feb 02", phase: "Phase 4: The Final Lap", theme: "Short Notes Loop Day 3",
      dailyAptitude: { topic: "Light Aptitude", questions: 10, timeLimit: "20 mins", completed: false },
      tasks: [
        { id: 1, title: "Formula Sheets: COA + CN + TOC + Compiler", description: "Final pass through all systems notes.", timeEstimate: "3 hours", type: "review", completed: false },
        { id: 2, title: "Error Log Review", description: "Read through your entire error log. Don't repeat mistakes.", timeEstimate: "2 hours", type: "review", completed: false }
      ]
    },
    {
      day: 51, date: "Feb 03", phase: "Phase 4: The Final Lap", theme: "Light Revision & Confidence Building",
      dailyAptitude: { topic: "Light Aptitude", questions: 10, timeLimit: "20 mins", completed: false },
      tasks: [
        { id: 1, title: "Favorite Topics Quick Review", description: "Go through your strongest subjects. Build confidence.", timeEstimate: "2 hours", type: "review", completed: false },
        { id: 2, title: "Relaxation & Mental Prep", description: "Light exercise, meditation, visualization. You've got this!", timeEstimate: "2 hours", type: "buffer", completed: false }
      ]
    },
    {
      day: 52, date: "Feb 04", phase: "Phase 4: The Final Lap", theme: "Final Checklist Day",
      dailyAptitude: { topic: "Just 5 Quick Questions", questions: 5, timeLimit: "10 mins", completed: false },
      tasks: [
        { id: 1, title: "Formula Sheets - Final Glance", description: "Quick 1-hour pass through all formula sheets.", timeEstimate: "1 hour", type: "review", completed: false },
        { id: 2, title: "Exam Day Logistics", description: "Check admit card, exam center location, what to carry. Sleep early!", timeEstimate: "1 hour", type: "buffer", completed: false }
      ]
    },
    {
      day: 53, date: "Feb 05", phase: "Phase 4: The Final Lap", theme: "Rest Day 1",
      dailyAptitude: { topic: "NO APTITUDE TODAY", questions: 0, timeLimit: "0 mins", completed: true },
      tasks: [
        { id: 1, title: "Light Formula Revision", description: "30 mins max. Just flip through.", timeEstimate: "30 mins", type: "review", completed: false },
        { id: 2, title: "Hydrate & Sleep", description: "Drink water. Sleep 8+ hours. NO studying after 6 PM.", timeEstimate: "All day", type: "buffer", completed: false }
      ]
    },
    {
      day: 54, date: "Feb 06", phase: "Phase 4: The Final Lap", theme: "EXAM DAY",
      dailyAptitude: { topic: "NO APTITUDE - IT'S GAME TIME", questions: 0, timeLimit: "0 mins", completed: true },
      tasks: [
        { id: 1, title: "Morning Confidence Boost", description: "Read one formula sheet of your choice. That's it.", timeEstimate: "15 mins", type: "review", completed: false },
        { id: 2, title: "THE EXAM", description: "You've prepared for 54 days. Trust your preparation. Execute the plan. YOU'VE GOT THIS! 🔥🏆", timeEstimate: "3 hours", type: "test", completed: false }
      ]
    }
  ] // ... (Your full 54 days array goes here. For testing, these 2 days are enough to start)
  ;

  // --- 5. RENDER HELPERS ---
  if (days.length === 0) return <div className="p-8 text-center">Loading Battle Plan...</div>;

  const activeDay = days[currentDay];
  // Safety check in case activeDay is undefined
  if (!activeDay) return <div className="p-8 text-center">Data Error. Please clear cache.</div>;

  const completedTasks = activeDay.tasks.filter(t => t.completed).length;
  const totalTasks = activeDay.tasks.length;
  const isAptitudeDone = activeDay.dailyAptitude.completed;
  
  const progress = Math.round(((completedTasks + (isAptitudeDone ? 1 : 0)) / (totalTasks + 1)) * 100);

  const getTypeColor = (type) => {
    switch(type) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'test': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'concept': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'practice': return 'text-green-600 bg-green-50 border-green-200';
      case 'review': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl border-x border-gray-100 flex flex-col font-sans">
      
      {/* HEADER */}
      <div className="bg-slate-900 text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Trophy size={120} />
        </div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{activeDay.phase}</div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Day {activeDay.day} <span className="text-slate-500 text-lg font-normal">| {activeDay.date}</span>
            </h1>
            <p className="text-slate-300 text-sm mt-1">{activeDay.theme}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-slate-800 rounded-xl p-2 w-16 h-16 border border-slate-700">
            <span className="text-xl font-bold text-green-400">{progress}%</span>
            <span className="text-[10px] text-slate-400">DONE</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CONTENT SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        
        {/* APTITUDE SECTION */}
        <div 
          onClick={toggleAptitude}
          className={`group cursor-pointer rounded-2xl p-4 border-2 transition-all duration-200 relative overflow-hidden ${
            isAptitudeDone ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-blue-300 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`mt-1 p-2 rounded-full ${isAptitudeDone ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Clock size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className={`font-bold ${isAptitudeDone ? 'text-green-800' : 'text-slate-800'}`}>Daily Aptitude</h3>
                {isAptitudeDone && <CheckCircle2 size={20} className="text-green-600" />}
              </div>
              <p className="text-sm text-slate-600 mb-2">{activeDay.dailyAptitude.topic}</p>
              <div className="flex gap-2 text-xs font-medium text-slate-500">
                <span className="bg-white px-2 py-1 rounded border border-slate-200">{activeDay.dailyAptitude.questions} Qs</span>
                <span className="bg-white px-2 py-1 rounded border border-slate-200">{activeDay.dailyAptitude.timeLimit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TASKS LIST */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest pl-2">
            <Target size={14} /> Core Tasks
          </div>
          
          {activeDay.tasks.map((task) => (
            <div 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`group cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                task.completed 
                  ? 'border-slate-200 bg-slate-50 opacity-75' 
                  : 'border-white bg-white shadow-sm hover:shadow-md hover:border-blue-200'
              }`}
            >
              <div className="flex gap-4">
                <div className={`mt-0.5 ${task.completed ? 'text-green-500' : 'text-slate-300 group-hover:text-blue-400'}`}>
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-semibold ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                      {task.title}
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide ${getTypeColor(task.type)}`}>
                      {task.type}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-2 ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                    {task.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={12} />
                    <span>{task.timeEstimate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <div className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 flex justify-between items-center z-20">
        <button 
          onClick={() => navigateDay(-1)}
          disabled={currentDay === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentDay === 0 ? 'text-gray-300' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ChevronLeft size={20} /> Prev
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xs text-slate-400 font-medium">STREAK</span>
          <div className="flex items-center gap-1 text-orange-500 font-bold">
            <Flame size={16} fill="currentColor" />
            <span>{currentDay + 1} / {days.length}</span>
          </div>
        </div>

        <button 
          onClick={() => navigateDay(1)}
          disabled={currentDay === days.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentDay === days.length - 1 ? 'text-gray-300' : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          Next <ChevronRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default GateDailyTracker;
