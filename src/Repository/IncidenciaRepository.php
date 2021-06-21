<?php

namespace App\Repository;

use App\Entity\Incidencia;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Incidencia|null find($id, $lockMode = null, $lockVersion = null)
 * @method Incidencia|null findOneBy(array $criteria, array $orderBy = null)
 * @method Incidencia[]    findAll()
 * @method Incidencia[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IncidenciaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Incidencia::class);
    }

    // /**
    //  * @return Incidencia[] Returns an array of Incidencia objects
    //  */

    public function findByEvento($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.evento = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findByEstadoAndUsuario($estado, $usuario)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.estado = :estado')
            ->andWhere('e.usuario = :user')
            ->leftJoin("i.evento", 'e')
            ->setParameter('user', $usuario)
            ->setParameter('estado', $estado)
            ->orderBy('i.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findByEstado($estado)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.estado = :estado')
            ->leftJoin("i.evento", 'e')
            ->setParameter('estado', $estado)
            ->orderBy('i.id', 'DESC')
            ->getQuery()
            ->getResult();
    }


    public function findById($value): ?Incidencia
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }

}
