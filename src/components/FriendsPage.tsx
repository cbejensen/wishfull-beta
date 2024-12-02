import { useState, useEffect } from 'react';
import { Search, UserPlus, UserMinus, Check, X, Users } from 'lucide-react';
import { useFriendStore } from '../store/friendStore';
import { User } from '../types';
import { Alert } from './Alert';

interface FriendsPageProps {
  currentUser: User;
}

export const FriendsPage: React.FC<FriendsPageProps> = ({ currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    friends,
    searchResults,
    isLoading,
    error,
    fetchFriends,
    searchUsers,
    sendFriendRequest,
    respondToRequest
  } = useFriendStore();

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchUsers(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, searchUsers]);

  const pendingRequests = friends.filter(f => f.status === 'pending');
  const acceptedFriends = friends.filter(f => f.status === 'accepted');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {error && (
        <Alert 
          message={error} 
          type="error" 
          onClose={() => useFriendStore.setState({ error: null })}
        />
      )}

      {pendingRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            Pending Friend Requests
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {pendingRequests.length}
            </span>
          </h2>
          <div className="space-y-3">
            {pendingRequests.map((friend) => (
              <div
                key={friend.friendship_id}
                className="flex items-center justify-between p-4 bg-purple-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{friend.friend_name}</p>
                  <p className="text-sm text-gray-500">{friend.friend_email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => respondToRequest(friend.friendship_id, true)}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => respondToRequest(friend.friendship_id, false)}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Find Friends</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {searchQuery && (
          <div className="mt-4 space-y-2">
            {searchResults.map((user) => (
              <div
                key={user.user_id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                {user.friendship_status === null && (
                  <button
                    onClick={() => sendFriendRequest(user.user_id)}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-purple-600 hover:text-purple-700 disabled:opacity-50"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Friend
                  </button>
                )}
                {user.friendship_status === 'pending' && (
                  <span className="text-sm text-gray-500">Request Pending</span>
                )}
                {user.friendship_status === 'accepted' && (
                  <span className="text-sm text-green-500">Friends</span>
                )}
                {user.friendship_status === 'rejected' && (
                  <button
                    onClick={() => sendFriendRequest(user.user_id)}
                    disabled={isLoading}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-purple-600 hover:text-purple-700 disabled:opacity-50"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Friend
                  </button>
                )}
              </div>
            ))}
            {searchResults.length === 0 && !isLoading && (
              <p className="text-gray-500 text-center py-4">No users found</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Friends</h2>
        {acceptedFriends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {acceptedFriends.map((friend) => (
              <div
                key={friend.friendship_id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{friend.friend_name}</p>
                  <p className="text-sm text-gray-500">{friend.friend_email}</p>
                </div>
                <button
                  onClick={() => respondToRequest(friend.friendship_id, false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <UserMinus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No friends yet</h3>
            <p className="text-gray-500">
              Search for users above to start adding friends!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
