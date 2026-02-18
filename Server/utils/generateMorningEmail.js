const quotes = [
  "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
  "Small daily improvements are the key to staggering long-term results.",
  "Discipline is choosing between what you want now and what you want most.",
  "Push yourself, because no one else is going to do it for you.",
  "Dream big. Start small. Act now.",
  "Your future is created by what you do today, not tomorrow.",
  "Consistency beats motivation every time.",
  "Do something today that your future self will thank you for.",
  "The secret of getting ahead is getting started.",
  "Focus on progress, not perfection.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Great things are built one small step at a time.",
  "Stay patient and trust your journey.",
  "Winners are not people who never fail, but people who never quit.",
  "Your only limit is the one you set for yourself.",
  "Don’t wait for opportunity. Create it.",
  "Action is the foundational key to all success.",
  "Success is built on daily habits, not once-in-a-lifetime efforts.",
  "Every day is a new chance to improve yourself.",
  "Small steps today lead to big achievements tomorrow.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Discipline is the bridge between goals and accomplishment.",
  "Stay consistent even when motivation fades.",
  "Work in silence. Let success make the noise.",
  "Your dreams don’t work unless you do.",
  "The difference between ordinary and extraordinary is that little extra.",
  "Make today count.",
  "Keep going. Everything you need will come to you at the perfect time.",
  "Success is the sum of small efforts repeated daily.",
  "The harder you work, the luckier you get.",
  "Stop wishing. Start doing.",
  "Progress, not excuses.",
  "One task at a time. One day at a time.",
  "Be stronger than your strongest excuse.",
  "Done is better than perfect.",
  "Consistency creates confidence.",
  "Your habits decide your future.",
];

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

exports.generateMorningEmail = (userName, day, tasks) => {
  const hasTasks = tasks && tasks.length > 0;
  const quote = getRandomQuote();
  const taskRows = hasTasks
    ? tasks
        .map(
          (t, index) => `
          <tr>
            <td style="padding:12px 16px; border-bottom:1px solid #eee;">
              <div style="font-weight:600; font-size:14px; color:#222;">
                ${index + 1}. ${t.title}
              </div>
              <div style="font-size:12px; color:#777; margin-top:4px;">
                🕒 ${t.startTime} - ${t.endTime}
              </div>
            </td>
          </tr>
        `,
        )
        .join("")
    : `
      <tr>
        <td style="padding:16px; text-align:center; color:#777;">
          No tasks scheduled today 🌿<br/>
          Take some rest or plan something productive 💪
        </td>
      </tr>
    `;

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(90deg,#ff7a00,#ff9a3c); padding:20px; text-align:center;">
                <h2 style="margin:0; color:#ffffff;">
                  📅 ${day.toUpperCase()} Timetable
                </h2>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:20px 24px;">
                <p style="margin:0; font-size:16px; color:#333;">
                  Good Morning <strong>${userName}</strong> 🌞
                </p>
                <p style="margin:8px 0 0; font-size:14px; color:#555;">
                  Here’s your schedule for today:
                </p>
              </td>
            </tr>

            <!-- Tasks -->
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${taskRows}
                </table>
              </td>
            </tr>

             <!-- Motivational Quote Section -->
            <tr>
              <td style="padding:20px; background:#fff4e6; text-align:center;">
                <p style="margin:0; font-size:14px; font-style:italic; color:#444;">
                  "${quote}"
                </p>
              </td>
            </tr>

            <!-- Copyright -->
            <tr>
              <td style="padding:16px; text-align:center; font-size:11px; color:#999;">
                © ${new Date().getFullYear()} Timetable Scheduler
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

exports.generateTaskReminderEmail = (userName, task) => {
  const quote = getRandomQuote();

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(90deg,#4CAF50,#2E7D32); padding:20px; text-align:center;">
                <h2 style="margin:0; color:#ffffff;">
                  ⏰ Task Reminder
                </h2>
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="padding:20px 24px;">
                <p style="margin:0; font-size:16px; color:#333;">
                  Hello <strong>${userName}</strong> 👋
                </p>
                <p style="margin:8px 0 0; font-size:14px; color:#555;">
                  You have an upcoming task. Stay focused and keep going 💪
                </p>
              </td>
            </tr>

            <!-- Task Details -->
            <tr>
              <td style="padding:0 24px 20px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" 
                  style="background:#f9fafb; border-radius:8px;">
                  
                  <tr>
                    <td style="padding:16px;">
                      <div style="font-weight:600; font-size:15px; color:#222;">
                        📌 ${task.title}
                      </div>

                      <div style="font-size:13px; color:#666; margin-top:6px;">
                        ${task.description || "No description provided."}
                      </div>

                      ${
                        task.startTime && task.endTime
                          ? `
                      <div style="font-size:12px; color:#888; margin-top:8px;">
                        🕒 ${task.startTime} - ${task.endTime}
                      </div>`
                          : ""
                      }

                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Motivational Quote -->
            <tr>
              <td style="padding:20px; background:#e8f5e9; text-align:center;">
                <p style="margin:0; font-size:14px; font-style:italic; color:#444;">
                  "${quote}"
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px; text-align:center; font-size:11px; color:#999;">
                © ${new Date().getFullYear()} Task Reminder App
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
