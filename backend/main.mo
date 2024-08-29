import Nat "mo:base/Nat";

import Time "mo:base/Time";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Int "mo:base/Int";

actor {
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  stable var postIdCounter: Nat = 0;
  stable var postStore: [Post] = [];

  public func createPost(title: Text, body: Text, author: Text) : async Nat {
    let id = postIdCounter;
    postIdCounter += 1;

    let newPost: Post = {
      id;
      title;
      body;
      author;
      timestamp = Time.now();
    };

    postStore := Array.append<Post>([newPost], postStore);
    id
  };

  public query func getPosts() : async [Post] {
    Array.sort<Post>(postStore, func(a, b) {
      Int.compare(b.timestamp, a.timestamp)
    })
  };
}
