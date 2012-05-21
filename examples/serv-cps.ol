
(require (redis "redis"))

(define client (redis.createClient))

(client.set "foo" "bar")
(client.set "bar" "biz")
(client.set "biz" "hallo!")

(let ((msg (~ client.get
              (~ client.get
                 (~ client.get "foo")))))
  (console.log msg))

(client.end)

