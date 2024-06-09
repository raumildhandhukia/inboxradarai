import React from "react";

interface EmailListProps {
  emails: any[];
}

const EmailList: React.FC<EmailListProps> = ({ emails }) => {
  return (
    <div className="email-list-container p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-white">Your Emails</h1>
      <div className="email-list space-y-4">
        {emails.length > 0 ? (
          emails.map(({ id, snippet, payload }) => (
            <div
              key={id}
              className="email-item p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-200 mb-2">
                {snippet}
              </h2>
              <p className="text-gray-400">{payload.headers[0]?.value}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No emails to display</p>
        )}
      </div>
    </div>
  );
};

export default EmailList;
