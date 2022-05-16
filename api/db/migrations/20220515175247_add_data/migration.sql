-- CreateIndex
CREATE INDEX "BehavioralQuestion_common_idx" ON "BehavioralQuestion"("common");


INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you met a met a **major obstacle** on a project? How did you deal with it?',
'ADAPTIVE',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
  'Tell me a time you **did more than expected** of you?',
  'ACTION_ORIENTED',
  true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me a time you **took ownership of a project**?',
'ACTION_ORIENTED',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me a time your **team implemented one of your ideas**?',
'ACTION_ORIENTED',
false
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me a time you **made a suggestion to improve something**?',
'ACTION_ORIENTED',
true
);


INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Can you give an example of a **project or initiative you started** on your own?',
'ACTION_ORIENTED',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you met a met a **major obstacle on a project**. How did you deal with it.',
'ADAPTIVE',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time **you changed your mind on a belief** after being presented with data.',
'ADAPTIVE',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you had to deal with **multiple priorities at once**.',
'ADAPTIVE',
true
);


INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time a project **experienced a change you were not expecting**.',
'ADAPTIVE',
true
);


INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you had a **miscommunication with your supervisor** or product owner.',
'COMMUNICATION',
true
);


INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you had a **communicate bad news**.',
'COMMUNICATION',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you had a **communicate bad news**.',
'COMMUNICATION',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time **did not communicate well enough**.',
'COMMUNICATION',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you **had to speak up** in a situation.',
'COMMUNICATION',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you **disagreed with another developer**.',
'CONFLICT',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you **received helpful criticism**.',
'COMMUNICATION',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you **had to work with a difficult person**.',
'CONFLICT',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you **had to mange conflict** on your team.',
'CONFLICT',
false
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you had to **take an unusual or creative approach**.',
'CREATIVITY',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you **were faced with a complex problem**. How do you find a solution? What was your decision making process?',
'DECISION_MAKING',
false
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time **you made a decision that was unpopular**.',
'DECISION_MAKING',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time **you were on a project that failed**. What did you learn and what do you think could have been done to prevent it?',
'DECISION_MAKING',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you **made a poor decision**.',
'DECISION_MAKING',
true
);



INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time you **made a mistake** at work. How was it handled, and did you do anything to prevent it from happening again?',
'PROBLEM_SOLVING',
true
);


INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about **the most difficult problem** you faced. How did you handle it, and would you do anything differently now?',
'PROBLEM_SOLVING',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about **the most difficult problem** you faced. How did you handle it, and would you do anything differently now?',
'PROBLEM_SOLVING',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about **the most difficult problem** you faced. What made it difficult and what was the solution?',
'PROBLEM_SOLVING',
true
);

INSERT INTO "BehavioralQuestion" (question, category, common) 
VALUES 
(
'Tell me about a time **you noticed a problem** and solved it before it became a major one?',
'PROBLEM_SOLVING',
false
);
