Phase 1 (limit stops):
  Design and print motor housing with sockets for all 3 motors and loops to guide the string.
  Design and print motor spools.
  Design and print limit switches.
  Buy signal wire (ribbon cable?) and springs.
  Design and print piece to attach to string in rear to trip forward limit stops.
  Attach signal wire and limit switches to ceiling.
  Wire arduino to kill power to motors when limit switch is off.
  Rewrite arduino program to seen limit stop event when stop is off and to periodically send status of all switches.
  Write scala program to test the switches (using fixed voltages and no kinect feedback)

Phase 2 (kinect feedback):
  Install kinect and figure out how to get 3D map input into a scala program.
  Rewrite ball tracking algorithm in scala.
  Display ball position on screen (using scala/processing or swing scala)
  Accept html5 control input using akka.

Phase 3 (control learning):
  Have program enter a learning phase where it creates target points for the ball at each point in time
    and tries to position the ball at those points using the motors. Using the kinect input, it will use
    the known motor inputs, the previous position and velocity of the ball, and the new position of the
    ball to learn a function from motor inputs to acceleration. It will need to respond to limit stop
    events. It should not need to know, a priori, about the geometry of the ceiling eye bolts or of the
    kinect sensor.
  Have program save learning weights to so learning can start where it left off so long as the geometry
    has not changed (or changed much).
  Display acceleration curves as a funciton of motor input, position, velocity, etc.
  Display learning progress as the difference between desired acceleration and measured acceleration.

Phase 4 (manipulation):
  Once acceleration parameters for a given geometry are known, experiment with various test patterns of
    motion.
  Create html5 iPad app to manipulate ball.
