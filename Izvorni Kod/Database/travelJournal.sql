toc.dat                                                                                             0000600 0004000 0002000 00000064466 14770240236 0014464 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   
                    }            travelJournal    16.2    16.2 X    $           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         %           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         &           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         '           1262    18001    travelJournal    DATABASE     �   CREATE DATABASE "travelJournal" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Croatian_Croatia.1250';
    DROP DATABASE "travelJournal";
                postgres    false         �            1259    18077    comment    TABLE     �   CREATE TABLE public.comment (
    commentid integer NOT NULL,
    content text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid integer NOT NULL,
    postid integer
);
    DROP TABLE public.comment;
       public         heap    postgres    false         �            1259    18076    comment_commentid_seq    SEQUENCE     �   CREATE SEQUENCE public.comment_commentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.comment_commentid_seq;
       public          postgres    false    225         (           0    0    comment_commentid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.comment_commentid_seq OWNED BY public.comment.commentid;
          public          postgres    false    224         �            1259    18097    country    TABLE     �   CREATE TABLE public.country (
    countryid integer NOT NULL,
    countryname text NOT NULL,
    countrycode integer NOT NULL
);
    DROP TABLE public.country;
       public         heap    postgres    false         �            1259    18096    country_countryid_seq    SEQUENCE     �   CREATE SEQUENCE public.country_countryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.country_countryid_seq;
       public          postgres    false    227         )           0    0    country_countryid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.country_countryid_seq OWNED BY public.country.countryid;
          public          postgres    false    226         �            1259    18061    didshare    TABLE     [   CREATE TABLE public.didshare (
    userid integer NOT NULL,
    postid integer NOT NULL
);
    DROP TABLE public.didshare;
       public         heap    postgres    false         �            1259    18028    expense    TABLE     �   CREATE TABLE public.expense (
    expenseid integer NOT NULL,
    category text NOT NULL,
    amount integer NOT NULL,
    currency text NOT NULL,
    data text NOT NULL,
    description text NOT NULL,
    tripid integer NOT NULL
);
    DROP TABLE public.expense;
       public         heap    postgres    false         �            1259    18027    expense_expenseid_seq    SEQUENCE     �   CREATE SEQUENCE public.expense_expenseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.expense_expenseid_seq;
       public          postgres    false    220         *           0    0    expense_expenseid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.expense_expenseid_seq OWNED BY public.expense.expenseid;
          public          postgres    false    219         �            1259    18120    location    TABLE     �   CREATE TABLE public.location (
    locationid integer NOT NULL,
    name text NOT NULL,
    latitude text NOT NULL,
    longitude text NOT NULL,
    placeid integer,
    countryid integer
);
    DROP TABLE public.location;
       public         heap    postgres    false         �            1259    18119    location_locationid_seq    SEQUENCE     �   CREATE SEQUENCE public.location_locationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.location_locationid_seq;
       public          postgres    false    231         +           0    0    location_locationid_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.location_locationid_seq OWNED BY public.location.locationid;
          public          postgres    false    230         �            1259    18159    media    TABLE     �   CREATE TABLE public.media (
    mediaid integer NOT NULL,
    filepath text NOT NULL,
    mediatype text NOT NULL,
    uploadedat date NOT NULL,
    tripid integer NOT NULL,
    locationid integer
);
    DROP TABLE public.media;
       public         heap    postgres    false         �            1259    18158    media_mediaid_seq    SEQUENCE     �   CREATE SEQUENCE public.media_mediaid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.media_mediaid_seq;
       public          postgres    false    234         ,           0    0    media_mediaid_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.media_mediaid_seq OWNED BY public.media.mediaid;
          public          postgres    false    233         �            1259    18106    place    TABLE     �   CREATE TABLE public.place (
    placeid integer NOT NULL,
    placename text NOT NULL,
    placepostalcode integer NOT NULL,
    countryid integer NOT NULL
);
    DROP TABLE public.place;
       public         heap    postgres    false         �            1259    18105    place_placeid_seq    SEQUENCE     �   CREATE SEQUENCE public.place_placeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.place_placeid_seq;
       public          postgres    false    229         -           0    0    place_placeid_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.place_placeid_seq OWNED BY public.place.placeid;
          public          postgres    false    228         �            1259    18042 
   sharedpost    TABLE     �   CREATE TABLE public.sharedpost (
    postid integer NOT NULL,
    content text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid integer NOT NULL,
    tripid integer NOT NULL
);
    DROP TABLE public.sharedpost;
       public         heap    postgres    false         �            1259    18041    sharedpost_postid_seq    SEQUENCE     �   CREATE SEQUENCE public.sharedpost_postid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.sharedpost_postid_seq;
       public          postgres    false    222         .           0    0    sharedpost_postid_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.sharedpost_postid_seq OWNED BY public.sharedpost.postid;
          public          postgres    false    221         �            1259    18003    tjuser    TABLE       CREATE TABLE public.tjuser (
    userid integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    passwordhash text NOT NULL,
    profilepicture text,
    bio text,
    role text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.tjuser;
       public         heap    postgres    false         �            1259    18002    tjuser_userid_seq    SEQUENCE     �   CREATE SEQUENCE public.tjuser_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.tjuser_userid_seq;
       public          postgres    false    216         /           0    0    tjuser_userid_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.tjuser_userid_seq OWNED BY public.tjuser.userid;
          public          postgres    false    215         �            1259    18013    trip    TABLE     ,  CREATE TABLE public.trip (
    tripid integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    totalcost integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid integer NOT NULL
);
    DROP TABLE public.trip;
       public         heap    postgres    false         �            1259    18012    trip_tripid_seq    SEQUENCE     �   CREATE SEQUENCE public.trip_tripid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.trip_tripid_seq;
       public          postgres    false    218         0           0    0    trip_tripid_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.trip_tripid_seq OWNED BY public.trip.tripid;
          public          postgres    false    217         �            1259    18138    waslocation    TABLE     $  CREATE TABLE public.waslocation (
    tripid integer NOT NULL,
    locationid integer NOT NULL,
    visitedon date NOT NULL,
    notes text NOT NULL,
    viberating integer NOT NULL,
    foodrating integer NOT NULL,
    worthitrating integer NOT NULL,
    CONSTRAINT waslocation_foodrating_check CHECK (((foodrating >= 1) AND (foodrating <= 5))),
    CONSTRAINT waslocation_viberating_check CHECK (((viberating >= 1) AND (viberating <= 5))),
    CONSTRAINT waslocation_worthitrating_check CHECK (((worthitrating >= 1) AND (worthitrating <= 5)))
);
    DROP TABLE public.waslocation;
       public         heap    postgres    false         Q           2604    18080    comment commentid    DEFAULT     v   ALTER TABLE ONLY public.comment ALTER COLUMN commentid SET DEFAULT nextval('public.comment_commentid_seq'::regclass);
 @   ALTER TABLE public.comment ALTER COLUMN commentid DROP DEFAULT;
       public          postgres    false    224    225    225         S           2604    18100    country countryid    DEFAULT     v   ALTER TABLE ONLY public.country ALTER COLUMN countryid SET DEFAULT nextval('public.country_countryid_seq'::regclass);
 @   ALTER TABLE public.country ALTER COLUMN countryid DROP DEFAULT;
       public          postgres    false    226    227    227         N           2604    18031    expense expenseid    DEFAULT     v   ALTER TABLE ONLY public.expense ALTER COLUMN expenseid SET DEFAULT nextval('public.expense_expenseid_seq'::regclass);
 @   ALTER TABLE public.expense ALTER COLUMN expenseid DROP DEFAULT;
       public          postgres    false    220    219    220         U           2604    18123    location locationid    DEFAULT     z   ALTER TABLE ONLY public.location ALTER COLUMN locationid SET DEFAULT nextval('public.location_locationid_seq'::regclass);
 B   ALTER TABLE public.location ALTER COLUMN locationid DROP DEFAULT;
       public          postgres    false    231    230    231         V           2604    18162    media mediaid    DEFAULT     n   ALTER TABLE ONLY public.media ALTER COLUMN mediaid SET DEFAULT nextval('public.media_mediaid_seq'::regclass);
 <   ALTER TABLE public.media ALTER COLUMN mediaid DROP DEFAULT;
       public          postgres    false    233    234    234         T           2604    18109    place placeid    DEFAULT     n   ALTER TABLE ONLY public.place ALTER COLUMN placeid SET DEFAULT nextval('public.place_placeid_seq'::regclass);
 <   ALTER TABLE public.place ALTER COLUMN placeid DROP DEFAULT;
       public          postgres    false    229    228    229         O           2604    18045    sharedpost postid    DEFAULT     v   ALTER TABLE ONLY public.sharedpost ALTER COLUMN postid SET DEFAULT nextval('public.sharedpost_postid_seq'::regclass);
 @   ALTER TABLE public.sharedpost ALTER COLUMN postid DROP DEFAULT;
       public          postgres    false    221    222    222         J           2604    18006    tjuser userid    DEFAULT     n   ALTER TABLE ONLY public.tjuser ALTER COLUMN userid SET DEFAULT nextval('public.tjuser_userid_seq'::regclass);
 <   ALTER TABLE public.tjuser ALTER COLUMN userid DROP DEFAULT;
       public          postgres    false    215    216    216         L           2604    18016    trip tripid    DEFAULT     j   ALTER TABLE ONLY public.trip ALTER COLUMN tripid SET DEFAULT nextval('public.trip_tripid_seq'::regclass);
 :   ALTER TABLE public.trip ALTER COLUMN tripid DROP DEFAULT;
       public          postgres    false    218    217    218                   0    18077    comment 
   TABLE DATA           P   COPY public.comment (commentid, content, createdat, userid, postid) FROM stdin;
    public          postgres    false    225       4888.dat           0    18097    country 
   TABLE DATA           F   COPY public.country (countryid, countryname, countrycode) FROM stdin;
    public          postgres    false    227       4890.dat           0    18061    didshare 
   TABLE DATA           2   COPY public.didshare (userid, postid) FROM stdin;
    public          postgres    false    223       4886.dat           0    18028    expense 
   TABLE DATA           c   COPY public.expense (expenseid, category, amount, currency, data, description, tripid) FROM stdin;
    public          postgres    false    220       4883.dat           0    18120    location 
   TABLE DATA           ]   COPY public.location (locationid, name, latitude, longitude, placeid, countryid) FROM stdin;
    public          postgres    false    231       4894.dat !          0    18159    media 
   TABLE DATA           ]   COPY public.media (mediaid, filepath, mediatype, uploadedat, tripid, locationid) FROM stdin;
    public          postgres    false    234       4897.dat           0    18106    place 
   TABLE DATA           O   COPY public.place (placeid, placename, placepostalcode, countryid) FROM stdin;
    public          postgres    false    229       4892.dat           0    18042 
   sharedpost 
   TABLE DATA           P   COPY public.sharedpost (postid, content, createdat, userid, tripid) FROM stdin;
    public          postgres    false    222       4885.dat           0    18003    tjuser 
   TABLE DATA           m   COPY public.tjuser (userid, username, email, passwordhash, profilepicture, bio, role, createdat) FROM stdin;
    public          postgres    false    216       4879.dat           0    18013    trip 
   TABLE DATA           l   COPY public.trip (tripid, title, description, startdate, enddate, totalcost, createdat, userid) FROM stdin;
    public          postgres    false    218       4881.dat           0    18138    waslocation 
   TABLE DATA           r   COPY public.waslocation (tripid, locationid, visitedon, notes, viberating, foodrating, worthitrating) FROM stdin;
    public          postgres    false    232       4895.dat 1           0    0    comment_commentid_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.comment_commentid_seq', 120, true);
          public          postgres    false    224         2           0    0    country_countryid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.country_countryid_seq', 30, true);
          public          postgres    false    226         3           0    0    expense_expenseid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.expense_expenseid_seq', 30, true);
          public          postgres    false    219         4           0    0    location_locationid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.location_locationid_seq', 60, true);
          public          postgres    false    230         5           0    0    media_mediaid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.media_mediaid_seq', 120, true);
          public          postgres    false    233         6           0    0    place_placeid_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.place_placeid_seq', 30, true);
          public          postgres    false    228         7           0    0    sharedpost_postid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.sharedpost_postid_seq', 30, true);
          public          postgres    false    221         8           0    0    tjuser_userid_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tjuser_userid_seq', 60, true);
          public          postgres    false    215         9           0    0    trip_tripid_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.trip_tripid_seq', 30, true);
          public          postgres    false    217         e           2606    18085    comment comment_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (commentid);
 >   ALTER TABLE ONLY public.comment DROP CONSTRAINT comment_pkey;
       public            postgres    false    225         g           2606    18104    country country_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (countryid);
 >   ALTER TABLE ONLY public.country DROP CONSTRAINT country_pkey;
       public            postgres    false    227         c           2606    18065    didshare didshare_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.didshare
    ADD CONSTRAINT didshare_pkey PRIMARY KEY (userid, postid);
 @   ALTER TABLE ONLY public.didshare DROP CONSTRAINT didshare_pkey;
       public            postgres    false    223    223         _           2606    18035    expense expense_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (expenseid);
 >   ALTER TABLE ONLY public.expense DROP CONSTRAINT expense_pkey;
       public            postgres    false    220         k           2606    18127    location location_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (locationid);
 @   ALTER TABLE ONLY public.location DROP CONSTRAINT location_pkey;
       public            postgres    false    231         o           2606    18166    media media_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (mediaid);
 :   ALTER TABLE ONLY public.media DROP CONSTRAINT media_pkey;
       public            postgres    false    234         i           2606    18113    place place_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_pkey PRIMARY KEY (placeid);
 :   ALTER TABLE ONLY public.place DROP CONSTRAINT place_pkey;
       public            postgres    false    229         a           2606    18050    sharedpost sharedpost_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.sharedpost
    ADD CONSTRAINT sharedpost_pkey PRIMARY KEY (postid);
 D   ALTER TABLE ONLY public.sharedpost DROP CONSTRAINT sharedpost_pkey;
       public            postgres    false    222         [           2606    18011    tjuser tjuser_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.tjuser
    ADD CONSTRAINT tjuser_pkey PRIMARY KEY (userid);
 <   ALTER TABLE ONLY public.tjuser DROP CONSTRAINT tjuser_pkey;
       public            postgres    false    216         ]           2606    18021    trip trip_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_pkey PRIMARY KEY (tripid);
 8   ALTER TABLE ONLY public.trip DROP CONSTRAINT trip_pkey;
       public            postgres    false    218         m           2606    18147    waslocation waslocation_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.waslocation
    ADD CONSTRAINT waslocation_pkey PRIMARY KEY (tripid, locationid);
 F   ALTER TABLE ONLY public.waslocation DROP CONSTRAINT waslocation_pkey;
       public            postgres    false    232    232         v           2606    18091    comment comment_postid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_postid_fkey FOREIGN KEY (postid) REFERENCES public.sharedpost(postid) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.comment DROP CONSTRAINT comment_postid_fkey;
       public          postgres    false    222    225    4705         w           2606    18086    comment comment_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_userid_fkey FOREIGN KEY (userid) REFERENCES public.tjuser(userid) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.comment DROP CONSTRAINT comment_userid_fkey;
       public          postgres    false    216    4699    225         t           2606    18071    didshare didshare_postid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.didshare
    ADD CONSTRAINT didshare_postid_fkey FOREIGN KEY (postid) REFERENCES public.sharedpost(postid) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.didshare DROP CONSTRAINT didshare_postid_fkey;
       public          postgres    false    4705    222    223         u           2606    18066    didshare didshare_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.didshare
    ADD CONSTRAINT didshare_userid_fkey FOREIGN KEY (userid) REFERENCES public.tjuser(userid) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.didshare DROP CONSTRAINT didshare_userid_fkey;
       public          postgres    false    216    4699    223         q           2606    18036    expense expense_tripid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_tripid_fkey FOREIGN KEY (tripid) REFERENCES public.trip(tripid) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.expense DROP CONSTRAINT expense_tripid_fkey;
       public          postgres    false    218    220    4701         y           2606    18133     location location_countryid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_countryid_fkey FOREIGN KEY (countryid) REFERENCES public.country(countryid) ON DELETE SET NULL;
 J   ALTER TABLE ONLY public.location DROP CONSTRAINT location_countryid_fkey;
       public          postgres    false    4711    227    231         z           2606    18128    location location_placeid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_placeid_fkey FOREIGN KEY (placeid) REFERENCES public.place(placeid) ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.location DROP CONSTRAINT location_placeid_fkey;
       public          postgres    false    231    4713    229         }           2606    18172    media media_locationid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_locationid_fkey FOREIGN KEY (locationid) REFERENCES public.location(locationid) ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.media DROP CONSTRAINT media_locationid_fkey;
       public          postgres    false    4715    234    231         ~           2606    18167    media media_tripid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_tripid_fkey FOREIGN KEY (tripid) REFERENCES public.trip(tripid) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.media DROP CONSTRAINT media_tripid_fkey;
       public          postgres    false    234    218    4701         x           2606    18114    place place_countryid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_countryid_fkey FOREIGN KEY (countryid) REFERENCES public.country(countryid) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.place DROP CONSTRAINT place_countryid_fkey;
       public          postgres    false    229    4711    227         r           2606    18056 !   sharedpost sharedpost_tripid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sharedpost
    ADD CONSTRAINT sharedpost_tripid_fkey FOREIGN KEY (tripid) REFERENCES public.trip(tripid) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.sharedpost DROP CONSTRAINT sharedpost_tripid_fkey;
       public          postgres    false    4701    218    222         s           2606    18051 !   sharedpost sharedpost_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sharedpost
    ADD CONSTRAINT sharedpost_userid_fkey FOREIGN KEY (userid) REFERENCES public.tjuser(userid) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.sharedpost DROP CONSTRAINT sharedpost_userid_fkey;
       public          postgres    false    216    4699    222         p           2606    18022    trip trip_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_userid_fkey FOREIGN KEY (userid) REFERENCES public.tjuser(userid) ON DELETE CASCADE;
 ?   ALTER TABLE ONLY public.trip DROP CONSTRAINT trip_userid_fkey;
       public          postgres    false    218    4699    216         {           2606    18153 '   waslocation waslocation_locationid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.waslocation
    ADD CONSTRAINT waslocation_locationid_fkey FOREIGN KEY (locationid) REFERENCES public.location(locationid) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.waslocation DROP CONSTRAINT waslocation_locationid_fkey;
       public          postgres    false    4715    232    231         |           2606    18148 #   waslocation waslocation_tripid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.waslocation
    ADD CONSTRAINT waslocation_tripid_fkey FOREIGN KEY (tripid) REFERENCES public.trip(tripid) ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.waslocation DROP CONSTRAINT waslocation_tripid_fkey;
       public          postgres    false    232    4701    218                                                                                                                                                                                                                  4888.dat                                                                                            0000600 0004000 0002000 00000005171 14770240236 0014276 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        91	Paris was magical! The Eiffel Tower at night is a must-see.	2024-04-11 14:30:00	2	1
92	Loved the cherry blossoms in Tokyo! Such a beautiful experience.	2024-05-26 10:15:00	3	2
93	Hiking the Grand Canyon was tough but so worth it!	2024-06-21 08:45:00	4	3
94	Bali beaches were stunning! Highly recommend Uluwatu Temple.	2024-07-16 18:20:00	5	4
95	Iceland’s glaciers were breathtaking. Can’t wait to go back!	2024-08-13 12:05:00	6	5
96	Skiing in the Swiss Alps was a dream come true!	2024-12-21 16:40:00	7	6
97	New York City is amazing! Times Square is super lively at night.	2024-09-08 20:10:00	8	7
98	Sydney was incredible! Surfing at Bondi Beach was unforgettable.	2024-10-19 11:30:00	9	8
99	Santorini sunsets are the best I’ve ever seen.	2024-06-26 19:55:00	10	9
100	London’s history is fascinating! The British Museum is a must-visit.	2024-03-21 13:25:00	1	10
101	Dubai was unreal! The Burj Khalifa views were insane.	2024-11-11 09:50:00	12	11
102	Machu Picchu was one of the most breathtaking places I’ve visited.	2024-07-31 17:40:00	13	12
103	Egypt’s pyramids are even more impressive in person!	2024-09-26 07:35:00	14	13
104	Venice is so romantic! Gondola rides are worth every penny.	2024-05-21 22:15:00	15	14
105	The Amazon rainforest was an adventure of a lifetime.	2024-08-16 05:55:00	16	15
106	Hawaii was paradise! The Road to Hana was incredible.	2024-10-16 14:20:00	17	16
107	Spain’s food is amazing! Tapas in Barcelona are a must-try.	2024-04-26 16:05:00	18	17
108	Going on a safari in South Africa was a surreal experience!	2024-11-26 18:30:00	19	18
109	The Canadian Rockies are stunning! Banff is beautiful.	2024-06-16 07:10:00	20	19
110	Seeing the Northern Lights in Norway was magical.	2024-12-11 23:45:00	11	20
111	Thailand’s beaches are unreal! Phi Phi Islands were my favorite.	2024-07-21 15:55:00	22	21
112	Patagonia’s landscapes are breathtaking! Loved hiking there.	2024-03-31 09:25:00	23	22
113	Italy is a dream! The Colosseum in Rome is so impressive.	2024-09-11 12:50:00	24	23
114	Berlin’s history is so interesting! Loved visiting the Berlin Wall.	2024-10-26 20:15:00	25	24
115	South Korea’s food is incredible! Loved Korean BBQ.	2024-08-26 11:40:00	26	25
116	Diving in the Great Barrier Reef was an unforgettable experience!	2024-05-31 17:05:00	27	26
117	Portugal’s coastal views are stunning! Porto was my favorite.	2024-04-21 08:30:00	28	27
118	New Zealand is an adventure paradise! So many beautiful hikes.	2024-07-11 14:55:00	29	28
119	The Moroccan Sahara was an experience I’ll never forget.	2024-11-16 16:20:00	30	29
120	Alaska’s wildlife is incredible! Saw whales and bears up close.	2024-12-26 21:05:00	21	30
\.


                                                                                                                                                                                                                                                                                                                                                                                                       4890.dat                                                                                            0000600 0004000 0002000 00000000677 14770240236 0014275 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	France	33
2	Japan	81
3	United States	1
4	Indonesia	62
5	Iceland	354
6	Switzerland	41
7	United Kingdom	44
8	Australia	61
9	Greece	30
10	United Arab Emirates	971
11	Peru	51
12	Egypt	20
13	Italy	39
14	Brazil	55
15	South Africa	27
16	Spain	34
17	Canada	1
18	Norway	47
19	Thailand	66
20	Chile	56
21	Germany	49
22	South Korea	82
23	Portugal	351
24	New Zealand	64
25	Morocco	212
26	Mexico	52
27	India	91
28	Vietnam	84
29	Argentina	54
30	Kenya	254
\.


                                                                 4886.dat                                                                                            0000600 0004000 0002000 00000000247 14770240236 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1
2	2
3	3
4	4
5	5
6	6
7	7
8	8
9	9
10	10
11	11
12	12
13	13
14	14
15	15
16	16
17	17
18	18
19	19
20	20
21	21
22	22
23	23
24	24
25	25
26	26
27	27
28	28
29	29
30	30
\.


                                                                                                                                                                                                                                                                                                                                                         4883.dat                                                                                            0000600 0004000 0002000 00000004125 14770240236 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Accommodation	500	USD	Hotel booking	Stayed at a 4-star hotel in Paris.	1
2	Food	200	USD	Restaurant meals	Fine dining and local cafes.	1
3	Transport	150	USD	Metro tickets & taxis	Public transport around Paris.	1
4	Activities	250	USD	Museum passes	Visited the Louvre and Eiffel Tower.	1
5	Shopping	100	USD	Souvenirs	Bought gifts for family.	1
6	Accommodation	700	USD	Airbnb rental	Cozy apartment in Tokyo.	2
7	Food	300	USD	Street food & restaurants	Tried sushi, ramen, and tempura.	2
8	Transport	200	USD	Japan Rail Pass	Traveled between Tokyo and Kyoto.	2
9	Activities	400	USD	Theme park tickets	Visited Disneyland Tokyo.	2
10	Shopping	150	USD	Electronics & anime merch	Bought gadgets and collectibles.	2
11	Accommodation	300	USD	Camping gear	Stayed in a tent at the Grand Canyon.	3
12	Food	100	USD	Campfire meals	Cooked food over an open fire.	3
13	Transport	250	USD	Car rental	Drove around Arizona.	3
14	Activities	200	USD	Park entrance & guides	Hiking tour with a guide.	3
15	Shopping	50	USD	Outdoor gear	Bought new hiking boots.	3
16	Accommodation	600	USD	Resort stay	Beachfront resort in Bali.	4
17	Food	250	USD	Local delicacies	Enjoyed fresh seafood and tropical fruits.	4
18	Transport	180	USD	Scooter rental	Explored the island on a scooter.	4
19	Activities	300	USD	Surfing & snorkeling	Took surfing lessons and explored coral reefs.	4
20	Shopping	120	USD	Handmade crafts	Bought Balinese art and souvenirs.	4
21	Accommodation	1000	USD	Mountain lodge	Stayed in a scenic lodge in Iceland.	5
22	Food	350	USD	Local cuisine	Tried Icelandic lamb and seafood.	5
23	Transport	400	USD	Car rental	Drove around the Golden Circle.	5
24	Activities	500	USD	Glacier hike & Blue Lagoon	Explored glaciers and soaked in hot springs.	5
25	Shopping	200	USD	Winter gear	Bought thermal clothes and souvenirs.	5
26	Accommodation	800	USD	Luxury ski resort	Stayed in Zermatt, Switzerland.	6
27	Food	400	USD	Swiss delicacies	Tried fondue and chocolate.	6
28	Transport	300	USD	Train pass	Used Swiss Rail for transport.	6
29	Activities	700	USD	Ski passes & gear rental	Skied in the Alps.	6
30	Shopping	250	USD	Sportswear	Bought new ski equipment.	6
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                           4894.dat                                                                                            0000600 0004000 0002000 00000002425 14770240236 0014272 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        31	Eiffel Tower	48.8584	2.2945	1	5
32	Shibuya Crossing	35.6595	139.7004	2	3
33	Grand Canyon National Park	36.1070	-112.1130	3	7
34	Uluwatu Temple	-8.8296	115.0846	4	2
35	Jökulsárlón Glacier Lagoon	64.0784	-16.2306	5	8
36	Matterhorn	45.9763	7.6586	6	10
37	Times Square	40.7580	-73.9855	7	4
38	Sydney Opera House	-33.8568	151.2153	8	9
39	Santorini Caldera	36.3932	25.4615	9	6
40	British Museum	51.5194	-0.1270	10	1
41	Burj Khalifa	25.1972	55.2744	11	12
42	Machu Picchu	-13.1631	-72.5450	12	15
43	Great Pyramid of Giza	29.9792	31.1342	13	14
44	Venetian Canals	45.4408	12.3155	14	13
45	Amazon Rainforest	-3.4653	-62.2159	15	11
46	Haleakalā National Park	20.7204	-156.1552	16	18
47	Sagrada Família	41.4036	2.1744	17	20
48	Kruger National Park	-23.9884	31.5547	18	19
49	Lake Louise	51.4254	-116.1773	19	16
50	Tromsø Northern Lights Spot	69.6496	18.9560	20	17
51	Phi Phi Islands	7.7407	98.7774	21	23
52	Torres del Paine	-51.2530	-72.3459	22	22
53	Colosseum	41.8902	12.4922	23	24
54	Berlin Wall Memorial	52.5351	13.3903	24	26
55	Gwangjang Market	37.5701	126.9995	25	25
56	Great Barrier Reef	-18.2861	147.7000	26	27
57	Douro Valley	41.1602	-7.7742	27	28
58	Milford Sound	-44.6710	167.9248	28	30
59	Sahara Desert (Merzouga)	31.0804	-4.0115	29	29
60	Kenai Fjords National Park	60.0438	-149.5228	30	21
\.


                                                                                                                                                                                                                                           4897.dat                                                                                            0000600 0004000 0002000 00000003144 14770240236 0014274 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        91	/uploads/paris_eiffel.jpg	image	2024-04-10	1	31
92	/uploads/tokyo_shibuya.mp4	video	2024-05-25	2	32
93	/uploads/grand_canyon_sunset.jpg	image	2024-06-20	3	33
94	/uploads/bali_beach.jpg	image	2024-07-15	4	34
95	/uploads/iceland_glacier.mp4	video	2024-08-12	5	35
96	/uploads/matterhorn_ski.jpg	image	2024-12-20	6	36
97	/uploads/nyc_times_square.jpg	image	2024-09-07	7	37
98	/uploads/sydney_opera.jpg	image	2024-10-18	8	38
99	/uploads/santorini_sunset.mp4	video	2024-06-25	9	39
100	/uploads/london_museum.jpg	image	2024-03-20	10	40
101	/uploads/dubai_burj.jpg	image	2024-11-10	11	41
102	/uploads/machu_picchu_hike.mp4	video	2024-07-30	12	42
103	/uploads/giza_pyramids.jpg	image	2024-09-25	13	43
104	/uploads/venice_gondola.jpg	image	2024-05-20	14	44
105	/uploads/amazon_rainforest.mp4	video	2024-08-15	15	45
106	/uploads/hawaii_road_hana.jpg	image	2024-10-15	16	46
107	/uploads/barcelona_tapas.jpg	image	2024-04-25	17	47
108	/uploads/safari_lion.jpg	image	2024-11-25	18	48
109	/uploads/banff_lake.jpg	image	2024-06-15	19	49
110	/uploads/northern_lights.mp4	video	2024-12-10	20	50
111	/uploads/thailand_phi_phi.jpg	image	2024-07-20	21	51
112	/uploads/patagonia_mountains.mp4	video	2024-03-30	22	52
113	/uploads/rome_colosseum.jpg	image	2024-09-10	23	53
114	/uploads/berlin_wall.jpg	image	2024-10-25	24	54
115	/uploads/seoul_bbq.mp4	video	2024-08-25	25	55
116	/uploads/great_barrier_reef.jpg	image	2024-05-30	26	56
117	/uploads/portugal_wine.jpg	image	2024-04-20	27	57
118	/uploads/milford_sound.mp4	video	2024-07-10	28	58
119	/uploads/moroccan_sahara.jpg	image	2024-11-15	29	59
120	/uploads/alaska_whales.mp4	video	2024-12-25	30	60
\.


                                                                                                                                                                                                                                                                                                                                                                                                                            4892.dat                                                                                            0000600 0004000 0002000 00000001100 14770240236 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Paris	75001	1
2	Tokyo	99	2
3	Grand Canyon Village	86023	3
4	Bali	80361	4
5	Reykjavik	101	5
6	Zermatt	3920	6
7	London	1	7
8	Sydney	2000	8
9	Santorini	84700	9
10	Dubai	0	10
11	Cusco	8002	11
12	Cairo	11511	12
13	Rome	184	13
14	Rio de Janeiro	20040	14
15	Cape Town	8001	15
16	Barcelona	8001	16
17	Vancouver	5	17
18	Oslo	150	18
19	Bangkok	10200	19
20	Santiago	8320000	20
21	Berlin	10117	21
22	Seoul	4524	22
23	Lisbon	1100	23
24	Auckland	1010	24
25	Marrakech	40000	25
26	Mexico City	6000	26
27	New Delhi	110001	27
28	Hanoi	100000	28
29	Buenos Aires	1001	29
30	Nairobi	100	30
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                4885.dat                                                                                            0000600 0004000 0002000 00000004524 14770240236 0014274 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Just arrived in Paris! The Eiffel Tower looks amazing.	2024-04-10 12:00:00	1	1
2	Tokyo is incredible! Can’t get enough of the cherry blossoms.	2024-05-25 15:30:00	2	2
3	Grand Canyon hike completed! What a view!	2024-06-20 08:00:00	3	3
4	Bali has the best beaches! Relaxing in Uluwatu now.	2024-07-15 17:45:00	4	4
5	Iceland is like another planet! Glaciers everywhere.	2024-08-12 14:20:00	5	5
6	Switzerland in winter is magical! Skiing in the Alps today.	2024-12-20 10:30:00	6	6
7	NYC is unreal! Times Square at night is an experience.	2024-09-07 21:10:00	7	7
8	Sydney Opera House is even better in person!	2024-10-18 11:50:00	8	8
9	Santorini sunsets are breathtaking!	2024-06-25 18:55:00	9	9
10	The British Museum in London has so much history!	2024-03-20 14:05:00	10	10
11	Dubai is futuristic! Visiting the Burj Khalifa now.	2024-11-10 09:00:00	11	11
12	Finally made it to Machu Picchu! Unreal views.	2024-07-30 16:20:00	12	12
13	The pyramids of Egypt are mind-blowing!	2024-09-25 07:45:00	13	13
14	Gondola ride in Venice = the perfect evening.	2024-05-20 22:30:00	14	14
15	Exploring the Amazon Rainforest today! Such a wild adventure.	2024-08-15 06:30:00	15	15
16	Driving the Road to Hana in Hawaii – stunning views everywhere!	2024-10-15 13:15:00	16	16
17	Eating the best tapas in Barcelona right now!	2024-04-25 19:45:00	17	17
18	South Africa safari – just spotted a lion!	2024-11-25 17:20:00	18	18
19	Hiking in Banff! These mountains are unreal.	2024-06-15 09:30:00	19	19
20	Chasing the Northern Lights in Norway tonight!	2024-12-10 23:00:00	20	20
21	Phi Phi Islands in Thailand – absolutely paradise!	2024-07-20 15:30:00	21	21
22	Hiking through Patagonia! What a breathtaking landscape.	2024-03-30 10:15:00	22	22
23	Rome is a dream! The Colosseum is massive!	2024-09-10 12:45:00	23	23
24	Visiting the Berlin Wall today – so much history here.	2024-10-25 20:45:00	24	24
25	Korean BBQ in Seoul is next-level delicious!	2024-08-25 12:20:00	25	25
26	Diving in the Great Barrier Reef – such a surreal experience!	2024-05-30 18:10:00	26	26
27	Portugal’s coast is beautiful! Loving Porto.	2024-04-20 09:50:00	27	27
28	New Zealand is a hiker’s paradise! Exploring Fiordland now.	2024-07-10 13:55:00	28	28
29	Riding camels in the Moroccan Sahara – unforgettable!	2024-11-15 16:10:00	29	29
30	Whale watching in Alaska! Saw an orca up close.	2024-12-25 22:20:00	30	30
\.


                                                                                                                                                                            4879.dat                                                                                            0000600 0004000 0002000 00000012121 14770240236 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	user1	user1@example.com	hash1	pic1.jpg	Bio 1	traveler	2025-03-23 17:22:59.006052
2	user2	user2@example.com	hash2	pic2.jpg	Bio 2	admin	2025-03-23 17:22:59.006052
3	user3	user3@example.com	hash3	pic3.jpg	Bio 3	traveler	2025-03-23 17:22:59.006052
4	user4	user4@example.com	hash4	pic4.jpg	Bio 4	admin	2025-03-23 17:22:59.006052
5	user5	user5@example.com	hash5	pic5.jpg	Bio 5	traveler	2025-03-23 17:22:59.006052
6	user6	user6@example.com	hash6	pic6.jpg	Bio 6	admin	2025-03-23 17:22:59.006052
7	user7	user7@example.com	hash7	pic7.jpg	Bio 7	traveler	2025-03-23 17:22:59.006052
8	user8	user8@example.com	hash8	pic8.jpg	Bio 8	admin	2025-03-23 17:22:59.006052
9	user9	user9@example.com	hash9	pic9.jpg	Bio 9	traveler	2025-03-23 17:22:59.006052
10	user10	user10@example.com	hash10	pic10.jpg	Bio 10	admin	2025-03-23 17:22:59.006052
11	user11	user11@example.com	hash11	pic11.jpg	Bio 11	traveler	2025-03-23 17:22:59.006052
12	user12	user12@example.com	hash12	pic12.jpg	Bio 12	admin	2025-03-23 17:22:59.006052
13	user13	user13@example.com	hash13	pic13.jpg	Bio 13	traveler	2025-03-23 17:22:59.006052
14	user14	user14@example.com	hash14	pic14.jpg	Bio 14	admin	2025-03-23 17:22:59.006052
15	user15	user15@example.com	hash15	pic15.jpg	Bio 15	traveler	2025-03-23 17:22:59.006052
16	user16	user16@example.com	hash16	pic16.jpg	Bio 16	admin	2025-03-23 17:22:59.006052
17	user17	user17@example.com	hash17	pic17.jpg	Bio 17	traveler	2025-03-23 17:22:59.006052
18	user18	user18@example.com	hash18	pic18.jpg	Bio 18	admin	2025-03-23 17:22:59.006052
19	user19	user19@example.com	hash19	pic19.jpg	Bio 19	traveler	2025-03-23 17:22:59.006052
20	user20	user20@example.com	hash20	pic20.jpg	Bio 20	admin	2025-03-23 17:22:59.006052
21	user21	user21@example.com	hash21	pic21.jpg	Bio 21	traveler	2025-03-23 17:22:59.006052
22	user22	user22@example.com	hash22	pic22.jpg	Bio 22	admin	2025-03-23 17:22:59.006052
23	user23	user23@example.com	hash23	pic23.jpg	Bio 23	traveler	2025-03-23 17:22:59.006052
24	user24	user24@example.com	hash24	pic24.jpg	Bio 24	admin	2025-03-23 17:22:59.006052
25	user25	user25@example.com	hash25	pic25.jpg	Bio 25	traveler	2025-03-23 17:22:59.006052
26	user26	user26@example.com	hash26	pic26.jpg	Bio 26	admin	2025-03-23 17:22:59.006052
27	user27	user27@example.com	hash27	pic27.jpg	Bio 27	traveler	2025-03-23 17:22:59.006052
28	user28	user28@example.com	hash28	pic28.jpg	Bio 28	admin	2025-03-23 17:22:59.006052
29	user29	user29@example.com	hash29	pic29.jpg	Bio 29	traveler	2025-03-23 17:22:59.006052
30	user30	user30@example.com	hash30	pic30.jpg	Bio 30	admin	2025-03-23 17:22:59.006052
31	user31	user31@example.com	hash31	pic31.jpg	Bio 31	traveler	2025-03-23 17:22:59.006052
32	user32	user32@example.com	hash32	pic32.jpg	Bio 32	admin	2025-03-23 17:22:59.006052
33	user33	user33@example.com	hash33	pic33.jpg	Bio 33	traveler	2025-03-23 17:22:59.006052
34	user34	user34@example.com	hash34	pic34.jpg	Bio 34	admin	2025-03-23 17:22:59.006052
35	user35	user35@example.com	hash35	pic35.jpg	Bio 35	traveler	2025-03-23 17:22:59.006052
36	user36	user36@example.com	hash36	pic36.jpg	Bio 36	admin	2025-03-23 17:22:59.006052
37	user37	user37@example.com	hash37	pic37.jpg	Bio 37	traveler	2025-03-23 17:22:59.006052
38	user38	user38@example.com	hash38	pic38.jpg	Bio 38	admin	2025-03-23 17:22:59.006052
39	user39	user39@example.com	hash39	pic39.jpg	Bio 39	traveler	2025-03-23 17:22:59.006052
40	user40	user40@example.com	hash40	pic40.jpg	Bio 40	admin	2025-03-23 17:22:59.006052
41	user41	user41@example.com	hash41	pic41.jpg	Bio 41	traveler	2025-03-23 17:22:59.006052
42	user42	user42@example.com	hash42	pic42.jpg	Bio 42	admin	2025-03-23 17:22:59.006052
43	user43	user43@example.com	hash43	pic43.jpg	Bio 43	traveler	2025-03-23 17:22:59.006052
44	user44	user44@example.com	hash44	pic44.jpg	Bio 44	admin	2025-03-23 17:22:59.006052
45	user45	user45@example.com	hash45	pic45.jpg	Bio 45	traveler	2025-03-23 17:22:59.006052
46	user46	user46@example.com	hash46	pic46.jpg	Bio 46	admin	2025-03-23 17:22:59.006052
47	user47	user47@example.com	hash47	pic47.jpg	Bio 47	traveler	2025-03-23 17:22:59.006052
48	user48	user48@example.com	hash48	pic48.jpg	Bio 48	admin	2025-03-23 17:22:59.006052
49	user49	user49@example.com	hash49	pic49.jpg	Bio 49	traveler	2025-03-23 17:22:59.006052
50	user50	user50@example.com	hash50	pic50.jpg	Bio 50	admin	2025-03-23 17:22:59.006052
51	user51	user51@example.com	hash51	pic51.jpg	Bio 51	traveler	2025-03-23 17:22:59.006052
52	user52	user52@example.com	hash52	pic52.jpg	Bio 52	admin	2025-03-23 17:22:59.006052
53	user53	user53@example.com	hash53	pic53.jpg	Bio 53	traveler	2025-03-23 17:22:59.006052
54	user54	user54@example.com	hash54	pic54.jpg	Bio 54	admin	2025-03-23 17:22:59.006052
55	user55	user55@example.com	hash55	pic55.jpg	Bio 55	traveler	2025-03-23 17:22:59.006052
56	user56	user56@example.com	hash56	pic56.jpg	Bio 56	admin	2025-03-23 17:22:59.006052
57	user57	user57@example.com	hash57	pic57.jpg	Bio 57	traveler	2025-03-23 17:22:59.006052
58	user58	user58@example.com	hash58	pic58.jpg	Bio 58	admin	2025-03-23 17:22:59.006052
59	user59	user59@example.com	hash59	pic59.jpg	Bio 59	traveler	2025-03-23 17:22:59.006052
60	user60	user60@example.com	hash60	pic60.jpg	Bio 60	admin	2025-03-23 17:22:59.006052
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                               4881.dat                                                                                            0000600 0004000 0002000 00000006421 14770240236 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Paris Adventure	Exploring the city of lights.	2024-04-01	2024-04-10	1200	2025-03-23 19:27:32.435763	1
2	Tokyo Experience	Cherry blossoms and sushi.	2024-05-15	2024-05-25	1800	2025-03-23 19:27:32.435763	2
3	Grand Canyon Trek	Hiking and camping in Arizona.	2024-06-10	2024-06-20	900	2025-03-23 19:27:32.435763	3
4	Bali Beach Trip	Relaxing on Bali’s white sand beaches.	2024-07-05	2024-07-15	1400	2025-03-23 19:27:32.435763	4
5	Iceland Adventure	Exploring glaciers and volcanoes.	2024-08-01	2024-08-12	2500	2025-03-23 19:27:32.435763	5
6	Swiss Alps Skiing	Ski trip to Zermatt, Switzerland.	2024-12-10	2024-12-20	3200	2025-03-23 19:27:32.435763	6
7	New York City Tour	Visiting Times Square and Central Park.	2024-09-01	2024-09-07	1500	2025-03-23 19:27:32.435763	7
8	Sydney Getaway	Surfing at Bondi Beach.	2024-10-10	2024-10-18	1800	2025-03-23 19:27:32.435763	8
9	Santorini Escape	Sunsets in Greece.	2024-06-15	2024-06-25	2100	2025-03-23 19:27:32.435763	9
10	London Historical Walk	Exploring British history.	2024-03-10	2024-03-20	1700	2025-03-23 19:27:32.435763	10
11	Dubai Luxury Trip	Skyscrapers and desert adventures.	2024-11-01	2024-11-10	4500	2025-03-23 19:27:32.435763	11
12	Machu Picchu Hike	Inca Trail adventure in Peru.	2024-07-20	2024-07-30	2200	2025-03-23 19:27:32.435763	12
13	Egyptian Wonders	Pyramids and ancient history.	2024-09-15	2024-09-25	1900	2025-03-23 19:27:32.435763	13
14	Venice Romantic Escape	Gondola rides through the canals.	2024-05-10	2024-05-20	2600	2025-03-23 19:27:32.435763	14
15	Amazon Rainforest Expedition	Wildlife and jungle trekking.	2024-08-05	2024-08-15	3000	2025-03-23 19:27:32.435763	15
16	Hawaii Island Hopping	Exploring Oahu, Maui, and Kauai.	2024-10-01	2024-10-15	3500	2025-03-23 19:27:32.435763	16
17	Barcelona & Madrid Tour	Spain’s vibrant culture.	2024-04-15	2024-04-25	2000	2025-03-23 19:27:32.435763	17
18	South African Safari	Kruger National Park adventure.	2024-11-15	2024-11-25	4000	2025-03-23 19:27:32.435763	18
19	Canadian Rockies Road Trip	Banff and Jasper National Parks.	2024-06-05	2024-06-15	1600	2025-03-23 19:27:32.435763	19
20	Norway Northern Lights	Chasing auroras in Tromsø.	2024-12-01	2024-12-10	2800	2025-03-23 19:27:32.435763	20
21	Thailand Beach Retreat	Island hopping in Phuket.	2024-07-10	2024-07-20	1500	2025-03-23 19:27:32.435763	21
22	Patagonia Hiking Trip	Argentina and Chile wilderness.	2024-03-20	2024-03-30	3200	2025-03-23 19:27:32.435763	22
23	Rome & Florence Tour	Discovering Italian art & history.	2024-09-01	2024-09-10	2300	2025-03-23 19:27:32.435763	23
24	Berlin & Amsterdam Cultural Tour	Museums and nightlife.	2024-10-15	2024-10-25	2100	2025-03-23 19:27:32.435763	24
25	Seoul & Jeju Island	Korean food and nature.	2024-08-15	2024-08-25	2000	2025-03-23 19:27:32.435763	25
26	Great Barrier Reef Diving	Exploring Australia’s marine life.	2024-05-20	2024-05-30	3000	2025-03-23 19:27:32.435763	26
27	Lisbon & Porto Portugal	Wine and coastal views.	2024-04-10	2024-04-20	1700	2025-03-23 19:27:32.435763	27
28	New Zealand Adventure	Road trip through North & South Island.	2024-06-25	2024-07-10	3500	2025-03-23 19:27:32.435763	28
29	Moroccan Desert Tour	Camel trekking in the Sahara.	2024-11-05	2024-11-15	2200	2025-03-23 19:27:32.435763	29
30	Alaskan Wildlife Expedition	Exploring glaciers and bears.	2024-12-15	2024-12-25	4000	2025-03-23 19:27:32.435763	30
\.


                                                                                                                                                                                                                                               4895.dat                                                                                            0000600 0004000 0002000 00000003221 14770240236 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	31	2024-03-10	Breathtaking view, worth every second!	5	4	5
2	32	2024-04-15	Super busy but an amazing experience.	4	5	5
3	33	2024-05-05	Hiking was exhausting but rewarding.	5	3	5
4	34	2024-06-12	The temple was peaceful and scenic.	4	5	4
5	35	2024-07-18	Glaciers were mesmerizing!	5	2	5
6	36	2024-08-21	Skiing here was a dream come true.	5	3	5
7	37	2024-09-10	Bright lights and energy overload!	4	5	5
8	38	2024-10-05	Opera House tour was fascinating.	4	4	4
9	39	2024-11-15	Santorini sunset is unmatched!	5	5	5
10	40	2024-12-20	History and artifacts galore.	4	3	4
11	41	2024-03-25	The tallest building ever!	5	4	5
12	42	2024-04-30	Breathtaking views in every direction.	5	3	5
13	43	2024-05-10	Unreal seeing the pyramids in person.	5	2	5
14	44	2024-06-17	Romantic and full of charm.	5	5	5
15	45	2024-07-22	Endless green and wildlife.	4	3	4
16	46	2024-08-05	Sunrise over the volcano was epic.	5	3	5
17	47	2024-09-10	Gaudí’s work is simply inspiring.	5	4	5
18	48	2024-10-19	Saw elephants and lions up close!	5	3	5
19	49	2024-11-28	The lake’s colors were unreal.	5	2	5
20	50	2024-12-25	Northern lights were magical!	5	2	5
21	51	2024-03-14	Crystal-clear waters and paradise.	5	5	5
22	52	2024-04-18	Incredible mountain hikes.	5	2	5
23	53	2024-05-29	So much history and awe-inspiring.	5	3	5
24	54	2024-06-07	A piece of history frozen in time.	4	3	4
25	55	2024-07-23	Food was beyond amazing.	4	5	4
26	56	2024-08-30	Snorkeling was a surreal experience.	5	4	5
27	57	2024-09-12	Wineries and river cruise were perfect.	5	4	5
28	58	2024-10-05	Nature at its finest.	5	3	5
29	59	2024-11-22	Desert adventure under the stars.	5	2	5
30	60	2024-12-31	Wildlife and glaciers everywhere!	5	3	5
\.


                                                                                                                                                                                                                                                                                                                                                                               restore.sql                                                                                         0000600 0004000 0002000 00000051611 14770240236 0015375 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "travelJournal";
--
-- Name: travelJournal; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "travelJournal" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Croatian_Croatia.1250';


ALTER DATABASE "travelJournal" OWNER TO postgres;

\connect "travelJournal"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    commentid integer NOT NULL,
    content text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid integer NOT NULL,
    postid integer
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: comment_commentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_commentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_commentid_seq OWNER TO postgres;

--
-- Name: comment_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_commentid_seq OWNED BY public.comment.commentid;


--
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    countryid integer NOT NULL,
    countryname text NOT NULL,
    countrycode integer NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- Name: country_countryid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_countryid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.country_countryid_seq OWNER TO postgres;

--
-- Name: country_countryid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.country_countryid_seq OWNED BY public.country.countryid;


--
-- Name: didshare; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.didshare (
    userid integer NOT NULL,
    postid integer NOT NULL
);


ALTER TABLE public.didshare OWNER TO postgres;

--
-- Name: expense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense (
    expenseid integer NOT NULL,
    category text NOT NULL,
    amount integer NOT NULL,
    currency text NOT NULL,
    data text NOT NULL,
    description text NOT NULL,
    tripid integer NOT NULL
);


ALTER TABLE public.expense OWNER TO postgres;

--
-- Name: expense_expenseid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expense_expenseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expense_expenseid_seq OWNER TO postgres;

--
-- Name: expense_expenseid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expense_expenseid_seq OWNED BY public.expense.expenseid;


--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    locationid integer NOT NULL,
    name text NOT NULL,
    latitude text NOT NULL,
    longitude text NOT NULL,
    placeid integer,
    countryid integer
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: location_locationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_locationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.location_locationid_seq OWNER TO postgres;

--
-- Name: location_locationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_locationid_seq OWNED BY public.location.locationid;


--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    mediaid integer NOT NULL,
    filepath text NOT NULL,
    mediatype text NOT NULL,
    uploadedat date NOT NULL,
    tripid integer NOT NULL,
    locationid integer
);


ALTER TABLE public.media OWNER TO postgres;

--
-- Name: media_mediaid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_mediaid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_mediaid_seq OWNER TO postgres;

--
-- Name: media_mediaid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_mediaid_seq OWNED BY public.media.mediaid;


--
-- Name: place; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.place (
    placeid integer NOT NULL,
    placename text NOT NULL,
    placepostalcode integer NOT NULL,
    countryid integer NOT NULL
);


ALTER TABLE public.place OWNER TO postgres;

--
-- Name: place_placeid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.place_placeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.place_placeid_seq OWNER TO postgres;

--
-- Name: place_placeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.place_placeid_seq OWNED BY public.place.placeid;


--
-- Name: sharedpost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sharedpost (
    postid integer NOT NULL,
    content text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid integer NOT NULL,
    tripid integer NOT NULL
);


ALTER TABLE public.sharedpost OWNER TO postgres;

--
-- Name: sharedpost_postid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sharedpost_postid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sharedpost_postid_seq OWNER TO postgres;

--
-- Name: sharedpost_postid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sharedpost_postid_seq OWNED BY public.sharedpost.postid;


--
-- Name: tjuser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tjuser (
    userid integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    passwordhash text NOT NULL,
    profilepicture text,
    bio text,
    role text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tjuser OWNER TO postgres;

--
-- Name: tjuser_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tjuser_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tjuser_userid_seq OWNER TO postgres;

--
-- Name: tjuser_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tjuser_userid_seq OWNED BY public.tjuser.userid;


--
-- Name: trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip (
    tripid integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    totalcost integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid integer NOT NULL
);


ALTER TABLE public.trip OWNER TO postgres;

--
-- Name: trip_tripid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trip_tripid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trip_tripid_seq OWNER TO postgres;

--
-- Name: trip_tripid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trip_tripid_seq OWNED BY public.trip.tripid;


--
-- Name: waslocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.waslocation (
    tripid integer NOT NULL,
    locationid integer NOT NULL,
    visitedon date NOT NULL,
    notes text NOT NULL,
    viberating integer NOT NULL,
    foodrating integer NOT NULL,
    worthitrating integer NOT NULL,
    CONSTRAINT waslocation_foodrating_check CHECK (((foodrating >= 1) AND (foodrating <= 5))),
    CONSTRAINT waslocation_viberating_check CHECK (((viberating >= 1) AND (viberating <= 5))),
    CONSTRAINT waslocation_worthitrating_check CHECK (((worthitrating >= 1) AND (worthitrating <= 5)))
);


ALTER TABLE public.waslocation OWNER TO postgres;

--
-- Name: comment commentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN commentid SET DEFAULT nextval('public.comment_commentid_seq'::regclass);


--
-- Name: country countryid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country ALTER COLUMN countryid SET DEFAULT nextval('public.country_countryid_seq'::regclass);


--
-- Name: expense expenseid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense ALTER COLUMN expenseid SET DEFAULT nextval('public.expense_expenseid_seq'::regclass);


--
-- Name: location locationid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location ALTER COLUMN locationid SET DEFAULT nextval('public.location_locationid_seq'::regclass);


--
-- Name: media mediaid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media ALTER COLUMN mediaid SET DEFAULT nextval('public.media_mediaid_seq'::regclass);


--
-- Name: place placeid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place ALTER COLUMN placeid SET DEFAULT nextval('public.place_placeid_seq'::regclass);


--
-- Name: sharedpost postid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sharedpost ALTER COLUMN postid SET DEFAULT nextval('public.sharedpost_postid_seq'::regclass);


--
-- Name: tjuser userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tjuser ALTER COLUMN userid SET DEFAULT nextval('public.tjuser_userid_seq'::regclass);


--
-- Name: trip tripid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip ALTER COLUMN tripid SET DEFAULT nextval('public.trip_tripid_seq'::regclass);


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (commentid, content, createdat, userid, postid) FROM stdin;
\.
COPY public.comment (commentid, content, createdat, userid, postid) FROM '$$PATH$$/4888.dat';

--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country (countryid, countryname, countrycode) FROM stdin;
\.
COPY public.country (countryid, countryname, countrycode) FROM '$$PATH$$/4890.dat';

--
-- Data for Name: didshare; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.didshare (userid, postid) FROM stdin;
\.
COPY public.didshare (userid, postid) FROM '$$PATH$$/4886.dat';

--
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense (expenseid, category, amount, currency, data, description, tripid) FROM stdin;
\.
COPY public.expense (expenseid, category, amount, currency, data, description, tripid) FROM '$$PATH$$/4883.dat';

--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location (locationid, name, latitude, longitude, placeid, countryid) FROM stdin;
\.
COPY public.location (locationid, name, latitude, longitude, placeid, countryid) FROM '$$PATH$$/4894.dat';

--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (mediaid, filepath, mediatype, uploadedat, tripid, locationid) FROM stdin;
\.
COPY public.media (mediaid, filepath, mediatype, uploadedat, tripid, locationid) FROM '$$PATH$$/4897.dat';

--
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (placeid, placename, placepostalcode, countryid) FROM stdin;
\.
COPY public.place (placeid, placename, placepostalcode, countryid) FROM '$$PATH$$/4892.dat';

--
-- Data for Name: sharedpost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sharedpost (postid, content, createdat, userid, tripid) FROM stdin;
\.
COPY public.sharedpost (postid, content, createdat, userid, tripid) FROM '$$PATH$$/4885.dat';

--
-- Data for Name: tjuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tjuser (userid, username, email, passwordhash, profilepicture, bio, role, createdat) FROM stdin;
\.
COPY public.tjuser (userid, username, email, passwordhash, profilepicture, bio, role, createdat) FROM '$$PATH$$/4879.dat';

--
-- Data for Name: trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip (tripid, title, description, startdate, enddate, totalcost, createdat, userid) FROM stdin;
\.
COPY public.trip (tripid, title, description, startdate, enddate, totalcost, createdat, userid) FROM '$$PATH$$/4881.dat';

--
-- Data for Name: waslocation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.waslocation (tripid, locationid, visitedon, notes, viberating, foodrating, worthitrating) FROM stdin;
\.
COPY public.waslocation (tripid, locationid, visitedon, notes, viberating, foodrating, worthitrating) FROM '$$PATH$$/4895.dat';

--
-- Name: comment_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_commentid_seq', 120, true);


--
-- Name: country_countryid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.country_countryid_seq', 30, true);


--
-- Name: expense_expenseid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expense_expenseid_seq', 30, true);


--
-- Name: location_locationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_locationid_seq', 60, true);


--
-- Name: media_mediaid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_mediaid_seq', 120, true);


--
-- Name: place_placeid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.place_placeid_seq', 30, true);


--
-- Name: sharedpost_postid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sharedpost_postid_seq', 30, true);


--
-- Name: tjuser_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tjuser_userid_seq', 60, true);


--
-- Name: trip_tripid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_tripid_seq', 30, true);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (commentid);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (countryid);


--
-- Name: didshare didshare_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.didshare
    ADD CONSTRAINT didshare_pkey PRIMARY KEY (userid, postid);


--
-- Name: expense expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (expenseid);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (locationid);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (mediaid);


--
-- Name: place place_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_pkey PRIMARY KEY (placeid);


--
-- Name: sharedpost sharedpost_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sharedpost
    ADD CONSTRAINT sharedpost_pkey PRIMARY KEY (postid);


--
-- Name: tjuser tjuser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tjuser
    ADD CONSTRAINT tjuser_pkey PRIMARY KEY (userid);


--
-- Name: trip trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_pkey PRIMARY KEY (tripid);


--
-- Name: waslocation waslocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waslocation
    ADD CONSTRAINT waslocation_pkey PRIMARY KEY (tripid, locationid);


--
-- Name: comment comment_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_postid_fkey FOREIGN KEY (postid) REFERENCES public.sharedpost(postid) ON DELETE CASCADE;


--
-- Name: comment comment_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_userid_fkey FOREIGN KEY (userid) REFERENCES public.tjuser(userid) ON DELETE CASCADE;


--
-- Name: didshare didshare_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.didshare
    ADD CONSTRAINT didshare_postid_fkey FOREIGN KEY (postid) REFERENCES public.sharedpost(postid) ON DELETE CASCADE;


--
-- Name: didshare didshare_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.didshare
    ADD CONSTRAINT didshare_userid_fkey FOREIGN KEY (userid) REFERENCES public.tjuser(userid) ON DELETE CASCADE;


--
-- Name: expense expense_tripid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_tripid_fkey FOREIGN KEY (tripid) REFERENCES public.trip(tripid) ON DELETE CASCADE;


--
-- Name: location location_countryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_countryid_fkey FOREIGN KEY (countryid) REFERENCES public.country(countryid) ON DELETE SET NULL;


--
-- Name: location location_placeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_placeid_fkey FOREIGN KEY (placeid) REFERENCES public.place(placeid) ON DELETE SET NULL;


--
-- Name: media media_locationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_locationid_fkey FOREIGN KEY (locationid) REFERENCES public.location(locationid) ON DELETE SET NULL;


--
-- Name: media media_tripid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_tripid_fkey FOREIGN KEY (tripid) REFERENCES public.trip(tripid) ON DELETE CASCADE;


--
-- Name: place place_countryid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT place_countryid_fkey FOREIGN KEY (countryid) REFERENCES public.country(countryid) ON DELETE CASCADE;


--
-- Name: sharedpost sharedpost_tripid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sharedpost
    ADD CONSTRAINT sharedpost_tripid_fkey FOREIGN KEY (tripid) REFERENCES public.trip(tripid) ON DELETE CASCADE;


--
-- Name: sharedpost sharedpost_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sharedpost
    ADD CONSTRAINT sharedpost_userid_fkey FOREIGN KEY (userid) REFERENCES public.tjuser(userid) ON DELETE CASCADE;


--
-- Name: trip trip_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_userid_fkey FOREIGN KEY (userid) REFERENCES public.tjuser(userid) ON DELETE CASCADE;


--
-- Name: waslocation waslocation_locationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waslocation
    ADD CONSTRAINT waslocation_locationid_fkey FOREIGN KEY (locationid) REFERENCES public.location(locationid) ON DELETE CASCADE;


--
-- Name: waslocation waslocation_tripid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.waslocation
    ADD CONSTRAINT waslocation_tripid_fkey FOREIGN KEY (tripid) REFERENCES public.trip(tripid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       