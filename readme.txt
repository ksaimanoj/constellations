The plan
1. Generate 'n' random points.
2. Give them some random velocity.
3. Once a point moves out of the board, a new point is generated randomly.



10. Find points which are close to each other.
11. Draw a line between the points, the brightness of the line is proportional to the distance between the points. Ponits which are near to each other are more bright lines than ones that are further away.

20. The mouse position is also considered as a point.




10-20:
11.   For each point, find the neighbouring points.
11.1. Eliminate the points that have a x_diff or y_diff value greater than the given radius.
11.2. Eliminate points which have distance greater than radius.
11.3. The remaining points are stored in a seperate array.

12.   Draw the lines between the points.
12.1. Draw simple white line.
12.2. Change the intensity of the line proportional to the distance.