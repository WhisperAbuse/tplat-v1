import {
  ChangeEvent,
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";
import { auth, googleAuthProvider, firestore } from "../../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useUserContext } from "@/lib/context";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";

interface IProps {
  className?: string;
}

const EnterPage: FC<IProps> = ({ className }) => {
  const { user, username } = useUserContext();
  console.log({ user, username });
  // 1. User signed out
  // 2. User signed in, no username
  // 3. User signed in, with username
  return (
    <main className={clsx("max-w-6xl mx-auto px-5 mt-16", className)}>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button
      className="flex items-center gap-2 px-5 py-3 bg-gray-100 rounded-md"
      onClick={signInWithGoogle}
    >
      <img src={"/google.png"} alt="google logo" className="w-6 h-6" /> Sign in
      with Google
    </button>
  );
};

const SignOutButton = () => {
  return (
    <button
      className="px-5 py-3 bg-gray-100 rounded-md"
      onClick={() => auth.signOut()}
    >
      Выйти
    </button>
  );
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useUserContext();

  useEffect(() => {});

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const userRef = doc(firestore, `users/${user.uid}`);
    const usernameRef = await doc(firestore, `usernames/${formValue}`);

    const batch = writeBatch(firestore);
    batch.set(userRef, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameRef, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }

    checkUsername(val);
  };

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const usernameSnap = await getDoc(
          doc(firestore, `usernames/${username}`)
        );
        const exists = usernameSnap.exists();
        console.log("Firestore read executed");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return !username ? (
    <section>
      <h3 className="mb-1 text-2xl font-semibold text-gray-700">
        Введите имя пользователя
      </h3>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Например, student1021"
          autoComplete="off"
          value={formValue}
          onChange={onChange}
          className="h-10 px-4 border border-gray-100 border-solid rounded-md bg-stone-50 shadown-md"
        />

        <div className="mt-1">
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
        </div>

        <button
          className="bg-indigo-600 text-white rounded-md px-5 py-1.5 my-5"
          type="submit"
          disabled={!isValid}
        >
          Выбрать
        </button>
        <h3 className="text-lg font-semibold text-gray-700">Debug State</h3>
        <div className="p-5 mt-1 bg-stone-50">
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
  ) : null;
};

interface IUsernameMessage {
  username: string;
  isValid: boolean;
  loading: boolean;
}

const UsernameMessage: FC<IUsernameMessage> = ({
  username,
  isValid,
  loading,
}) => {
  if (loading) {
    return <p className="">Проверяем...</p>;
  } else if (isValid) {
    return <p className="text-green-600">Имя {username} доступно!</p>;
  } else if (username && !isValid) {
    return <p className="text-red-600">Это имя уже занято!</p>;
  } else {
    return <p></p>;
  }
};

export default EnterPage;
