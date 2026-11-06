/*
  Task Hub default workspace
  ==========================
  The ready-made workspace offered on the sign-in screen ("Load default workspace"). Loading it is a
  single click and works even when index.html is opened straight from a folder.

  Everything between TaskHubDefault( and ); is plain JSON: edit it like any JSON file, keeping the
  quotes and commas valid. Nothing here is used until someone loads it; after that the workspace lives
  in the browser, or in the shared data file if one is connected.

  - "config": people, teams, roles, priorities, columns, filters, buttons, verification and settings.
    Passwords are written as "password": "..." and are replaced by a salted hash when loaded.
  - "items", "posts", "files", "notes", "activity": the sample content. Dates are relative, so the
    sample never goes stale: "dueInDays" counts from the day it is loaded (0 = today, -1 = yesterday)
    and "minutesAgo" from the moment it is loaded. Ids (i1, p1, t1, ...) link the records together.
  - "files" are names and sizes only; there is no file content.
*/
TaskHubDefault({
  "format": "taskhub-workspace",
  "name": "Task Hub default workspace",
  "config":
{
    "version": 7,
    "general": {
      "appName": "Task Hub",
      "tagline": "Handoff board with unread alerts for the next owner.",
      "boardTitle": "Operations Handoff Board",
      "boardIntro": "Click **Complete & handoff** on any item to transfer ownership. The next owner will receive an unread alert in the Action Inbox and, when viewing as that person, a pop-up notification.",
      "panelTitle": "Operations Panel",
      "refPrefix": "OMD-",
      "refDigits": 3,
      "initialStatusId": "assigned",
      "allowDrag": true,
      "loginHint": true,
      "modules": {
        "posts": true,
        "files": true,
        "notes": true,
        "overview": true
      }
    },
    "teams": [
      {
        "id": "t1",
        "name": "Operations Design",
        "color": "#343a8a",
        "bg": "#e4e4f7",
        "leadId": "p1",
        "nextTeamId": "t2"
      },
      {
        "id": "t2",
        "name": "Data Governance",
        "color": "#343a8a",
        "bg": "#e4e4f7",
        "leadId": "p2",
        "nextTeamId": "t3"
      },
      {
        "id": "t3",
        "name": "Controls",
        "color": "#343a8a",
        "bg": "#e4e4f7",
        "leadId": "p3",
        "nextTeamId": "t4"
      },
      {
        "id": "t4",
        "name": "Operations",
        "color": "#343a8a",
        "bg": "#e4e4f7",
        "leadId": "p4",
        "nextTeamId": "t5"
      },
      {
        "id": "t5",
        "name": "Implementation",
        "color": "#343a8a",
        "bg": "#e4e4f7",
        "leadId": "p7",
        "nextTeamId": ""
      }
    ],
    "people": [
      {
        "id": "p1",
        "name": "A. Chan",
        "teamId": "t1",
        "role": "",
        "active": true,
        "username": "achan",
        "password": "demo",
        "roleIds": [
          "r_member",
          "r_sysadmin"
        ]
      },
      {
        "id": "p2",
        "name": "B. Lee",
        "teamId": "t2",
        "role": "",
        "active": true,
        "username": "blee",
        "password": "demo",
        "roleIds": [
          "r_member",
          "r_steward"
        ]
      },
      {
        "id": "p3",
        "name": "C. Wong",
        "teamId": "t3",
        "role": "",
        "active": true,
        "username": "cwong",
        "password": "demo",
        "roleIds": [
          "r_member",
          "r_reviewer"
        ]
      },
      {
        "id": "p4",
        "name": "D. Patel",
        "teamId": "t4",
        "role": "",
        "active": true,
        "username": "dpatel",
        "password": "demo",
        "roleIds": [
          "r_member",
          "r_teamadmin",
          "r_reviewer"
        ]
      },
      {
        "id": "p5",
        "name": "E. Ng",
        "teamId": "t4",
        "role": "",
        "active": true,
        "username": "eng",
        "password": "demo",
        "roleIds": [
          "r_member"
        ]
      },
      {
        "id": "p6",
        "name": "F. Ho",
        "teamId": "t4",
        "role": "",
        "active": true,
        "username": "fho",
        "password": "demo",
        "roleIds": [
          "r_member"
        ]
      },
      {
        "id": "p7",
        "name": "G. Lim",
        "teamId": "t5",
        "role": "",
        "active": true,
        "username": "glim",
        "password": "demo",
        "roleIds": [
          "r_member"
        ]
      }
    ],
    "roles": [
      {
        "id": "r_member",
        "name": "Team member",
        "description": "Works their own items.",
        "sees": "own",
        "viewAs": "none",
        "actAs": false,
        "configure": false,
        "queue": false
      },
      {
        "id": "r_teamadmin",
        "name": "Team admin",
        "description": "Oversees the work of everyone in their team.",
        "sees": "team",
        "viewAs": "team",
        "actAs": false,
        "configure": false,
        "queue": false
      },
      {
        "id": "r_sysadmin",
        "name": "System administrator",
        "description": "Configures the workspace and can work as anyone.",
        "sees": "all",
        "viewAs": "all",
        "actAs": true,
        "configure": true,
        "queue": false
      },
      {
        "id": "r_reviewer",
        "name": "Controls reviewers",
        "description": "Picks up control reviews from the queue.",
        "sees": "own",
        "viewAs": "none",
        "actAs": false,
        "configure": false,
        "queue": true
      },
      {
        "id": "r_steward",
        "name": "Data stewards",
        "description": "Picks up data ownership questions from the queue.",
        "sees": "own",
        "viewAs": "none",
        "actAs": false,
        "configure": false,
        "queue": true
      }
    ],
    "priorities": [
      {
        "id": "pr1",
        "name": "High",
        "fg": "#9f1d26",
        "bg": "#f5d6d9",
        "dueDays": 1
      },
      {
        "id": "pr2",
        "name": "Medium",
        "fg": "#6a5100",
        "bg": "#f6edc1",
        "dueDays": 3
      },
      {
        "id": "pr3",
        "name": "Low",
        "fg": "#2a4c9a",
        "bg": "#dbe6fb",
        "dueDays": 5
      }
    ],
    "statuses": [
      {
        "id": "assigned",
        "name": "Assigned",
        "color": "#3a3fd4",
        "closed": false,
        "hold": false
      },
      {
        "id": "progress",
        "name": "In Progress",
        "color": "#c9610d",
        "closed": false,
        "hold": false
      },
      {
        "id": "blocked",
        "name": "Blocked",
        "color": "#cf232b",
        "closed": false,
        "hold": true
      },
      {
        "id": "verify",
        "name": "Verification",
        "color": "#7a4fc9",
        "closed": false,
        "hold": false
      },
      {
        "id": "completed",
        "name": "Completed",
        "color": "#2f9d45",
        "closed": true,
        "hold": false
      }
    ],
    "filters": [
      {
        "id": "f_all",
        "name": "All items",
        "match": "all",
        "count": "items",
        "conds": []
      },
      {
        "id": "f_open",
        "name": "Open items",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "state",
            "op": "open",
            "value": ""
          }
        ]
      },
      {
        "id": "f_mine",
        "name": "Assigned to me",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "state",
            "op": "open",
            "value": ""
          },
          {
            "subject": "owner",
            "op": "isViewer",
            "value": ""
          }
        ]
      },
      {
        "id": "f_next",
        "name": "Coming to me next",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "state",
            "op": "open",
            "value": ""
          },
          {
            "subject": "nextOwner",
            "op": "isViewer",
            "value": ""
          }
        ]
      },
      {
        "id": "f_myTeam",
        "name": "My team’s open items",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "state",
            "op": "open",
            "value": ""
          },
          {
            "subject": "team",
            "op": "viewerTeam",
            "value": ""
          }
        ]
      },
      {
        "id": "f_overdue",
        "name": "Overdue",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "due",
            "op": "overdue",
            "value": ""
          }
        ]
      },
      {
        "id": "f_dueSoon",
        "name": "Due soon",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "due",
            "op": "withinDays",
            "value": 2
          }
        ]
      },
      {
        "id": "f_blocked",
        "name": "Blocked",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "state",
            "op": "hold",
            "value": ""
          }
        ]
      },
      {
        "id": "f_closed",
        "name": "Closed",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "state",
            "op": "closed",
            "value": ""
          }
        ]
      },
      {
        "id": "f_unrouted",
        "name": "Open with no next owner",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "state",
            "op": "open",
            "value": ""
          },
          {
            "subject": "nextOwner",
            "op": "empty",
            "value": ""
          },
          {
            "subject": "queue",
            "op": "nextNone",
            "value": ""
          }
        ]
      },
      {
        "id": "f_alerts",
        "name": "With unread alerts",
        "match": "all",
        "count": "alerts",
        "conds": [
          {
            "subject": "alerts",
            "op": "hasUnread",
            "value": ""
          }
        ]
      },
      {
        "id": "f_hasNext",
        "name": "Has a next owner",
        "match": "any",
        "count": "items",
        "conds": [
          {
            "subject": "nextOwner",
            "op": "set",
            "value": ""
          },
          {
            "subject": "queue",
            "op": "nextSet",
            "value": ""
          }
        ]
      },
      {
        "id": "f_gov",
        "name": "Involves Data Governance",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "anyTeam",
            "op": "is",
            "value": "t2"
          }
        ]
      },
      {
        "id": "f_impl",
        "name": "Involves Implementation",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "anyTeam",
            "op": "is",
            "value": "t5"
          }
        ]
      },
      {
        "id": "f_noOffer",
        "name": "No pending handoff, queue or verification",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "offer",
            "op": "none",
            "value": ""
          },
          {
            "subject": "queue",
            "op": "none",
            "value": ""
          },
          {
            "subject": "approval",
            "op": "none",
            "value": ""
          }
        ]
      },
      {
        "id": "f_offered",
        "name": "Awaiting acceptance",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "offer",
            "op": "pending",
            "value": ""
          }
        ]
      },
      {
        "id": "f_offerToMe",
        "name": "Awaiting my acceptance",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "offer",
            "op": "toViewer",
            "value": ""
          }
        ]
      },
      {
        "id": "f_offerByMe",
        "name": "My handoffs awaiting others",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "offer",
            "op": "byViewer",
            "value": ""
          }
        ]
      },
      {
        "id": "f_myQueue",
        "name": "In my queues",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "queue",
            "op": "inMine",
            "value": ""
          }
        ]
      },
      {
        "id": "f_inQueue",
        "name": "In any queue",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "queue",
            "op": "inAny",
            "value": ""
          }
        ]
      },
      {
        "id": "f_verifyMine",
        "name": "Awaiting my verification",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "approval",
            "op": "mine",
            "value": ""
          }
        ]
      },
      {
        "id": "f_verifyPending",
        "name": "Waiting for verification",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "approval",
            "op": "pending",
            "value": ""
          }
        ]
      },
      {
        "id": "f_verifyByMe",
        "name": "My items in verification",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "approval",
            "op": "byViewer",
            "value": ""
          }
        ]
      },
      {
        "id": "f_high",
        "name": "High priority",
        "match": "all",
        "count": "items",
        "conds": [
          {
            "subject": "priority",
            "op": "in",
            "value": [
              "pr1"
            ]
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "a_approve",
        "label": "Approve",
        "color": "#2f7a1e",
        "outline": false,
        "width": "md",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": "f_verifyMine"
        },
        "steps": [
          {
            "type": "reason",
            "when": "",
            "prompt": "Verification note (optional)",
            "required": false
          },
          {
            "type": "approve",
            "when": ""
          }
        ]
      },
      {
        "id": "a_reject",
        "label": "Reject",
        "color": "#9b111b",
        "outline": false,
        "width": "md",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": "f_verifyMine"
        },
        "steps": [
          {
            "type": "reason",
            "when": "",
            "prompt": "What needs fixing? The owner will see this.",
            "required": true
          },
          {
            "type": "reject",
            "when": ""
          }
        ]
      },
      {
        "id": "a_recall",
        "label": "Withdraw from verification",
        "color": "#2e3394",
        "outline": true,
        "width": "full",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": "f_verifyByMe"
        },
        "steps": [
          {
            "type": "recallApproval",
            "when": ""
          }
        ]
      },
      {
        "id": "a_pickup",
        "label": "Pick up",
        "color": "#2f7a1e",
        "outline": false,
        "width": "full",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": "f_myQueue"
        },
        "steps": [
          {
            "type": "pickUp",
            "when": "",
            "land": ""
          }
        ]
      },
      {
        "id": "a_accept",
        "label": "Accept",
        "color": "#2f7a1e",
        "outline": false,
        "width": "md",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": "f_offerToMe"
        },
        "steps": [
          {
            "type": "acceptOffer",
            "when": "",
            "land": "assigned"
          },
          {
            "type": "reason",
            "when": "",
            "prompt": "Read-back or questions for the sender (optional)",
            "required": false
          },
          {
            "type": "route",
            "when": "",
            "useLead": true
          },
          {
            "type": "notify",
            "when": "",
            "who": "prevOwner",
            "personId": "",
            "message": "{actor} accepted the handoff of {ref} \"{title}\". {reason}",
            "onlyIfChanged": false
          },
          {
            "type": "notify",
            "when": "",
            "who": "nextOwner",
            "personId": "",
            "message": "You are next in line for {ref} \"{title}\", after {owner}.",
            "onlyIfChanged": true
          }
        ]
      },
      {
        "id": "a_decline",
        "label": "Decline",
        "color": "#9b111b",
        "outline": false,
        "width": "md",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": "f_offerToMe"
        },
        "steps": [
          {
            "type": "reason",
            "when": "",
            "prompt": "Why are you declining? The sender will see this.",
            "required": true
          },
          {
            "type": "declineOffer",
            "when": ""
          },
          {
            "type": "notify",
            "when": "",
            "who": "owner",
            "personId": "",
            "message": "{actor} declined the handoff of {ref} \"{title}\": {reason}",
            "onlyIfChanged": false
          }
        ]
      },
      {
        "id": "a_withdraw",
        "label": "Withdraw handoff",
        "color": "#2e3394",
        "outline": true,
        "width": "full",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": "f_offerByMe"
        },
        "steps": [
          {
            "type": "withdrawOffer",
            "when": ""
          }
        ]
      },
      {
        "id": "a_start",
        "label": "Start",
        "color": "#2e3394",
        "outline": false,
        "width": "sm",
        "show": {
          "statuses": [
            "assigned",
            "blocked"
          ],
          "filterId": "f_noOffer"
        },
        "steps": [
          {
            "type": "setStatus",
            "when": "",
            "to": "progress"
          }
        ]
      },
      {
        "id": "a_pause",
        "label": "Pause",
        "color": "#2e3394",
        "outline": false,
        "width": "sm",
        "show": {
          "statuses": [
            "progress"
          ],
          "filterId": "f_noOffer"
        },
        "steps": [
          {
            "type": "setStatus",
            "when": "",
            "to": "assigned"
          }
        ]
      },
      {
        "id": "a_handoff",
        "label": "Complete & handoff",
        "color": "#2f7a1e",
        "outline": false,
        "width": "lg",
        "show": {
          "statuses": [
            "assigned",
            "progress",
            "blocked"
          ],
          "filterId": "f_noOffer"
        },
        "steps": [
          {
            "type": "confirm",
            "when": "unless:f_hasNext",
            "message": "No next owner is set, so this marks “{title}” as complete. If it needs verification, it goes to the verifying group first. To hand it off instead, use Set next first."
          },
          {
            "type": "setStatus",
            "when": "unless:f_hasNext",
            "to": "completed"
          },
          {
            "type": "notify",
            "when": "unless:f_hasNext",
            "who": "owner",
            "personId": "",
            "message": "{ref} \"{title}\" was marked complete by {actor} (now {status}).",
            "onlyIfChanged": false
          },
          {
            "type": "handoverNote",
            "when": "if:f_hasNext",
            "sections": "Summary*, Open actions, Risks and watch-outs"
          },
          {
            "type": "offer",
            "when": "if:f_hasNext"
          }
        ]
      },
      {
        "id": "a_block",
        "label": "Block",
        "color": "#6a2b0a",
        "outline": false,
        "width": "md",
        "show": {
          "statuses": [
            "assigned",
            "progress"
          ],
          "filterId": ""
        },
        "steps": [
          {
            "type": "reason",
            "when": "",
            "prompt": "Reason (optional)",
            "required": false
          },
          {
            "type": "setStatus",
            "when": "",
            "to": "blocked"
          },
          {
            "type": "notify",
            "when": "",
            "who": "owner",
            "personId": "",
            "message": "{ref} \"{title}\" was blocked by {actor}. {reason}",
            "onlyIfChanged": false
          }
        ]
      },
      {
        "id": "a_unblock",
        "label": "Unblock",
        "color": "#2e3394",
        "outline": false,
        "width": "md",
        "show": {
          "statuses": [
            "blocked"
          ],
          "filterId": ""
        },
        "steps": [
          {
            "type": "setStatus",
            "when": "",
            "to": "__prev"
          }
        ]
      },
      {
        "id": "a_setnext",
        "label": "Set next",
        "color": "#2e3394",
        "outline": true,
        "width": "md",
        "show": {
          "statuses": [
            "assigned",
            "progress",
            "blocked"
          ],
          "filterId": "f_noOffer"
        },
        "steps": [
          {
            "type": "pickNext",
            "when": ""
          },
          {
            "type": "notify",
            "when": "",
            "who": "nextOwner",
            "personId": "",
            "message": "You are the next owner of {ref} \"{title}\" (set by {actor}).",
            "onlyIfChanged": true
          }
        ]
      },
      {
        "id": "a_edit",
        "label": "Edit",
        "color": "#2e3394",
        "outline": true,
        "width": "md",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": ""
        },
        "steps": [
          {
            "type": "edit",
            "when": ""
          }
        ]
      },
      {
        "id": "a_delete",
        "label": "Delete",
        "color": "#9b111b",
        "outline": false,
        "width": "md",
        "show": {
          "statuses": [
            "*"
          ],
          "filterId": ""
        },
        "steps": [
          {
            "type": "delete",
            "when": ""
          }
        ]
      }
    ],
    "fields": {
      "labels": {
        "title": "Task title",
        "ref": "Reference",
        "priority": "Priority",
        "team": "Current team",
        "owner": "Current owner",
        "nextTeam": "Next team",
        "nextOwner": "Next owner",
        "due": "Due date",
        "status": "Status",
        "desc": "Description"
      },
      "custom": []
    },
    "card": {
      "fields": [
        "owner",
        "nextOwner",
        "nextTeam",
        "due"
      ],
      "showRef": true,
      "showPriority": true,
      "showTeam": true,
      "showDesc": true
    },
    "stats": [
      {
        "id": "st1",
        "filterId": "f_open",
        "label": "Open items",
        "sub": "Everything not complete",
        "visible": true
      },
      {
        "id": "st2",
        "filterId": "f_mine",
        "label": "Assigned to me",
        "sub": "Based on current viewer",
        "visible": true
      },
      {
        "id": "st3",
        "filterId": "f_overdue",
        "label": "Overdue",
        "sub": "Past due and still open",
        "visible": true
      },
      {
        "id": "st4",
        "filterId": "f_blocked",
        "label": "Blocked",
        "sub": "Needs intervention",
        "visible": true
      },
      {
        "id": "st5",
        "filterId": "f_alerts",
        "label": "Unread alerts",
        "sub": "For the current viewer",
        "visible": true
      }
    ],
    "views": [
      {
        "id": "bv_all",
        "label": "All work",
        "filterId": "",
        "count": "f_open",
        "sidebar": true
      },
      {
        "id": "bv_mine",
        "label": "Assigned to me",
        "filterId": "f_mine",
        "count": "match",
        "sidebar": true
      },
      {
        "id": "bv_accept",
        "label": "Awaiting my acceptance",
        "filterId": "f_offerToMe",
        "count": "match",
        "sidebar": true
      },
      {
        "id": "bv_next",
        "label": "Coming to me next",
        "filterId": "f_next",
        "count": "match",
        "sidebar": true
      },
      {
        "id": "bv_blocked",
        "label": "Blocked",
        "filterId": "f_blocked",
        "count": "match",
        "sidebar": true
      },
      {
        "id": "bv_overdue",
        "label": "Overdue",
        "filterId": "f_overdue",
        "count": "match",
        "sidebar": false
      },
      {
        "id": "bv_alerts",
        "label": "With unread alerts",
        "filterId": "f_alerts",
        "count": "match",
        "sidebar": false
      }
    ],
    "notifications": {
      "assigned": true,
      "next": true,
      "comments": true,
      "popups": true,
      "popupSeconds": 9,
      "toastSeconds": 4,
      "position": "top",
      "align": "right",
      "animation": "slide",
      "animMs": 300,
      "reduceMotion": true,
      "sound": true,
      "soundFor": "alerts",
      "tone": "bell",
      "volume": 50,
      "popBg": "#ffffff",
      "popText": "#15171a",
      "popAccent": "#b5141e",
      "msgAccent": "#2f7a1e"
    },
    "approvals": {
      "enabled": true,
      "holdStatusId": "verify",
      "appliesTo": [
        "*"
      ],
      "allowSelf": false,
      "oneStagePerPerson": true,
      "allowNone": false,
      "chains": [
        {
          "id": "ap_dual",
          "name": "Two-group sign-off",
          "filterId": "f_high",
          "order": "sequence",
          "stages": [
            {
              "roleId": "r_reviewer"
            },
            {
              "roleId": "r_steward"
            }
          ]
        },
        {
          "id": "ap_std",
          "name": "Controls check",
          "filterId": "",
          "order": "sequence",
          "stages": [
            {
              "roleId": "r_reviewer"
            }
          ]
        }
      ]
    },
    "extensions": {
      "scriptsEnabled": false,
      "flags": [],
      "fieldTypes": [],
      "conditions": [],
      "steps": []
    }
  },
  "items": [
    {
      "id": "i1", "ref": "OMD-001", "title": "Custody model data ownership review",
      "priorityId": "pr1", "statusId": "assigned", "teamId": "t1", "ownerId": "p1", "nextTeamId": "t2", "nextOwnerId": "p2",
      "dueInDays": 0, "minutesAgo": 1,
      "desc": "Validate in-scope processes, ownership boundaries and required handoff points before the design pack is passed on.",
      "history": [{ "minutesAgo": 1, "type": "CREATE", "text": "OMD-001 created (sample board).", "actorId": "p1" }]
    },
    {
      "id": "i2", "ref": "OMD-002", "title": "Maker-checker exception routing",
      "priorityId": "pr2", "statusId": "progress", "teamId": "t3", "ownerId": "p3", "nextTeamId": "t4", "nextOwnerId": "p4",
      "dueInDays": 2, "minutesAgo": 1,
      "desc": "Review maker-checker steps, unresolved exceptions and evidence requirements for each handoff.",
      "history": [
        { "minutesAgo": 0, "type": "STATUS", "text": "OMD-002 moved to In Progress by C. Wong.", "actorId": "p3" },
        { "minutesAgo": 1, "type": "CREATE", "text": "OMD-002 created (sample board).", "actorId": "p3" }
      ]
    },
    {
      "id": "i3", "ref": "OMD-003", "title": "Reconciliation ownership clarification",
      "priorityId": "pr3", "statusId": "blocked", "prevStatusId": "progress", "teamId": "t4", "ownerId": "p5", "nextTeamId": "t4", "nextOwnerId": "p6",
      "dueInDays": 1, "minutesAgo": 1,
      "desc": "Blocked pending clarification on duplicate ownership in reconciliations.",
      "history": [{ "minutesAgo": 1, "type": "CREATE", "text": "OMD-003 created (sample board).", "actorId": "p5" }]
    },
    {
      "id": "i4", "ref": "OMD-004", "title": "Implementation readiness note",
      "priorityId": "pr2", "statusId": "completed", "teamId": "t5", "ownerId": "p7", "nextTeamId": "", "nextOwnerId": "",
      "dueInDays": -1, "minutesAgo": 1,
      "desc": "Readiness note issued and archived.",
      "history": [{ "minutesAgo": 1, "type": "CREATE", "text": "OMD-004 created (sample board).", "actorId": "p7" }]
    }
  ],
  "activity": [
    { "msg": "OMD-002 moved to In Progress by C. Wong.", "type": "STATUS", "minutesAgo": 0, "itemId": "i2" },
    { "msg": "Sample board loaded.", "type": "CREATE", "minutesAgo": 0 }
  ],
  "posts": [
    { "authorId": "p3", "text": "Maker-checker evidence checklist is in Files. Please flag any gaps before the Operations handoff.", "itemId": "i2", "minutesAgo": 60 },
    { "authorId": "p1", "text": "Design pack v2 for the custody model is ready for governance review once OMD-001 is handed off to B. Lee.", "itemId": "i1", "minutesAgo": 120 }
  ],
  "files": [
    { "name": "custody-model-design-pack-v2.pdf", "size": 482113, "type": "application/pdf", "byId": "p1", "itemId": "i1", "minutesAgo": 117 },
    { "name": "maker-checker-evidence-checklist.xlsx", "size": 38211, "type": "", "byId": "p3", "itemId": "i2", "minutesAgo": 58 }
  ],
  "notes": [
    { "authorId": "p1", "title": "Handoff conventions", "body": "Set the next owner and next team before completing an item. Completing without a next owner closes the item.", "minutesAgo": 150 }
  ]
});